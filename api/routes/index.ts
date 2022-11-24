import { NextFunction, Request, Response, Router } from "express";
import NotFoundError from "../errors/NotFoundError";
import { authJwt, authLocal, withRole } from "../middleware/auth";
import AuthController from "../modules/User/Auth.controller";
import { UserRole } from "../modules/User/User.constants";
import UserController from "../modules/User/User.controller";

const useMethod =
  (func: (req: any, res: Response, next: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (err) {
      next(err);
    }
  };

const registerAdminRoutes = (router: Router) => {
  const adminRouter = Router();

  // Register admin routes
  const userController = new UserController();
  adminRouter.get("/users", useMethod(userController.all));
  router.post("/register", useMethod(userController.create));
  router.patch("/users/:id", useMethod(userController.update));

  router.use(withRole(UserRole.Admin), adminRouter);
};

const registerOnboardingRoutes = (router: Router) => {
  // Register onboarding routes
  const authController = new AuthController();
  router.post("/login", authLocal, useMethod(authController.login));
};

const registerStudentRoutes = (router: Router) => {
  const authRouter = Router();

  // Register student routes

  router.use(authJwt, authRouter);
};

const registerTeacherRoutes = (router: Router) => {
  const teacherRouter = Router();

  // Register teacher routes

  router.use(withRole(UserRole.Teacher), teacherRouter);
};

const registerRoutes = (app: Router) => {
  // Onboarding routes
  registerOnboardingRoutes(app);

  // Admin routes
  registerAdminRoutes(app);

  // Student routes
  registerStudentRoutes(app);

  // Teacher routes
  registerTeacherRoutes(app);

  // Fallback route
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError());
  });
};

export { registerRoutes };
