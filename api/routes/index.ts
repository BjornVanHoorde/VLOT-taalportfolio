import { NextFunction, Request, Response, Router } from "express";
import NotFoundError from "../errors/NotFoundError";
import { authJwt, authLocal, withRole } from "../middleware/auth";
import KlasController from "../modules/Klas/Klas.controller";
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

const registerOnboardingRoutes = (router: Router) => {
  // Register onboarding routes
  const authController = new AuthController();
  router.post("/login", authLocal, useMethod(authController.login));
};

const registerAuthenticatedRoutes = (router: Router) => {
  const authRouter = Router();  

  // Student routes
  registerStudentRoutes(authRouter);
  
  // Teacher routes
  registerTeacherRoutes(authRouter);
  
  // Admin routes
  registerAdminRoutes(authRouter);

  // Authenticated routes use authJWT
  router.use(authJwt, authRouter);
};

const registerAdminRoutes = (router: Router) => {
  const adminRouter = Router();

  // Register admin routes
  const userController = new UserController();
  adminRouter.get("/users", useMethod(userController.all));
  adminRouter.get("/teachers", useMethod(userController.allTeachers));
  adminRouter.get("/students", useMethod(userController.allStudents));
  adminRouter.get("/user/:id", useMethod(userController.find));
  adminRouter.post("/register", useMethod(userController.create));
  adminRouter.patch("/users/:id", useMethod(userController.update));
  adminRouter.delete("/users/:id", useMethod(userController.delete));

  const klasController = new KlasController();
  adminRouter.get("/klassen", useMethod(klasController.all));
  adminRouter.get("/graad/:grade", useMethod(klasController.allByGrade));
  adminRouter.get("/klas/:id", useMethod(klasController.find));
  adminRouter.post("/klas", useMethod(klasController.create));
  adminRouter.patch("/klas/:id", useMethod(klasController.update));
  adminRouter.delete("/klas/:id", useMethod(klasController.delete));

  router.use(withRole([UserRole.Admin]), adminRouter);
};

const registerTeacherRoutes = (router: Router) => {
  const teacherRouter = Router();

  // Register teacher routes
  const userController = new UserController();
  teacherRouter.get("/students", useMethod(userController.allStudents));
  teacherRouter.get("/user/:id", useMethod(userController.find));

  const klasController = new KlasController();
  teacherRouter.get("/klassen", useMethod(klasController.all));
  teacherRouter.get("/graad/:grade", useMethod(klasController.allByGrade));
  teacherRouter.get("/klas/:id", useMethod(klasController.find));


  router.use(withRole([UserRole.Teacher, UserRole.Admin]), teacherRouter);
};

const registerStudentRoutes = (router: Router) => {
  const authRouter = Router();

  // Register student routes

  router.use(authJwt, authRouter);
};

const registerRoutes = (app: Router) => {
  // Onboarding routes
  registerOnboardingRoutes(app);

  // Authenticated routes
  registerAuthenticatedRoutes(app);

  // Fallback route
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError());
  });
};

export { registerRoutes };
