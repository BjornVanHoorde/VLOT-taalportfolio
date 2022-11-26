import { NextFunction, Request, Response, Router } from "express";
import NotFoundError from "../errors/NotFoundError";
import { authJwt, authLocal, withRole } from "../middleware/auth";
import KlasController from "../modules/Klas/Klas.controller";
import KlasLeerkrachtController from "../modules/KlasLeerkracht/KlasLeerkracht.controller";
import TaaltipController from "../modules/Taaltip/Taaltip.controller";
import TaaltipLeerlingController from "../modules/TaaltipLeerling/TaaltipLeerling.controller";
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

  const taaltipController = new TaaltipController();
  adminRouter.get("/taaltips", useMethod(taaltipController.all));
  adminRouter.get("/klas/:id/taaltips", useMethod(taaltipController.allByClass));
  adminRouter.get("/taaltips/vaardigheid/:skill", useMethod(taaltipController.allBySkill));
  adminRouter.get("/taaltips/taal/:language", useMethod(taaltipController.allByLanguage));
  adminRouter.get("/klas/:id/taaltips/:language/:skill", useMethod(taaltipController.allByClassLanguageSkill));
  adminRouter.get("/taaltip/:id", useMethod(taaltipController.find));
  adminRouter.post("/taaltip", useMethod(taaltipController.create));
  adminRouter.patch("/taaltip/:id", useMethod(taaltipController.update));
  adminRouter.delete("/taaltip/:id", useMethod(taaltipController.delete));

  const klasLeerkrachtController = new KlasLeerkrachtController();
  adminRouter.get("/leerkracht/klassen", useMethod(klasLeerkrachtController.all));
  adminRouter.get("/leerkracht/klassen/:id", useMethod(klasLeerkrachtController.allByClass));
  adminRouter.get("/leerkracht/:id/klassen", useMethod(klasLeerkrachtController.allByTeacher));
  adminRouter.get("/leerkracht/klas/:id", useMethod(klasLeerkrachtController.find));
  adminRouter.post("/leerkracht/klas", useMethod(klasLeerkrachtController.create));
  adminRouter.patch("/leerkracht/klas/:id", useMethod(klasLeerkrachtController.update));
  adminRouter.delete("/leerkracht/klas/:id", useMethod(klasLeerkrachtController.delete));

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

  const taaltipController = new TaaltipController();
  teacherRouter.get("/klas/:id/taaltips/:language/:skill", useMethod(taaltipController.allByClassLanguageSkill));
  teacherRouter.post("/taaltip", useMethod(taaltipController.create));
  teacherRouter.patch("/taaltip/:id", useMethod(taaltipController.update));
  teacherRouter.delete("/taaltip/:id", useMethod(taaltipController.delete));

  router.use(withRole([UserRole.Teacher, UserRole.Admin]), teacherRouter);
};

const registerStudentRoutes = (router: Router) => {
  const studentRouter = Router();

  // Register student routes
  const userController = new UserController();
  studentRouter.get("/user/:id", useMethod(userController.find));

  const taaltipController = new TaaltipController();
  studentRouter.get("/klas/:id/taaltips/:language/:skill", useMethod(taaltipController.allByClassLanguageSkill));

  const taaltipLeerlingController = new TaaltipLeerlingController();
  studentRouter.patch("/taaltips/antwoord/:id", useMethod(taaltipLeerlingController.update));

  router.use(withRole([UserRole.Teacher, UserRole.Admin, UserRole.Student]), studentRouter);
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
