import { NextFunction, Request, Response, Router } from "express";
import NotFoundError from "../errors/NotFoundError";
import { authJwt, authLocal, withRole } from "../middleware/auth";
import FoutenanalyseFoutenController from "../modules/FoutenanalyseFout/FoutenanalyseFout.controller";
import FoutenanalyseOnderdeelController from "../modules/FoutenanalyseOnderdeel/FoutenanalyseOnderdeel.controller";
import KlasController from "../modules/Klas/Klas.controller";
import KlasLeerkrachtController from "../modules/KlasLeerkracht/KlasLeerkracht.controller";
import TaalprofielAntwoordController from "../modules/TaalprofielAntwoord/TaalprofielAntwoord.controller";
import TaalprofielVraagController from "../modules/TaalprofielVraag/TaalprofielVraag.controller";
import TaaltipController from "../modules/Taaltip/Taaltip.controller";
import TaaltipLeerlingController from "../modules/TaaltipLeerling/TaaltipLeerling.controller";
import AuthController from "../modules/User/Auth.controller";
import { UserRole } from "../modules/User/User.constants";
import UserController from "../modules/User/User.controller";
import VaardighedenCriteriaController from "../modules/VaardighedenCriteria/VaardighedenCriteria.controller";
import VaardighedenEvaluatieController from "../modules/VaardighedenEvaluatie/VaardighedenEvaluatie.controller";
import VaardighedenOnderdeelController from "../modules/VaardighedenOnderdeel/VaardighedenOnderdeel.controller";
import WoordenschatOnderdeelController from "../modules/WoordenschatOnderdeel/WoordenschatOnderdeel.controller";
import WoordenschatWoordController from "../modules/WoordenschatWoord/WoordenschatWoord.controller";

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

  const taalprofielVragenController = new TaalprofielVraagController();
  adminRouter.get("/taalprofiel/vragen", useMethod(taalprofielVragenController.all));
  adminRouter.get("/taalprofiel/vragen/graad/:grade", useMethod(taalprofielVragenController.allByGrade));
  adminRouter.get("/taalprofiel/vragen/taal/:language", useMethod(taalprofielVragenController.allByLanguage));
  adminRouter.get("/taalprofiel/vragen/:id", useMethod(taalprofielVragenController.find));
  adminRouter.post("/taalprofiel/vragen", useMethod(taalprofielVragenController.create));
  adminRouter.patch("/taalprofiel/vragen/:id", useMethod(taalprofielVragenController.update));
  adminRouter.delete("/taalprofiel/vragen/:id", useMethod(taalprofielVragenController.delete));

  const taalprofielAntwoordenController = new TaalprofielAntwoordController();
  adminRouter.get("/taalprofiel/antwoorden", useMethod(taalprofielAntwoordenController.all));
  adminRouter.get("/taalprofiel/antwoorden/:id", useMethod(taalprofielAntwoordenController.find));
  adminRouter.post("/taalprofiel/antwoord", useMethod(taalprofielAntwoordenController.create));
  adminRouter.patch("/taalprofiel/antwoorden/:id", useMethod(taalprofielAntwoordenController.update));
  adminRouter.delete("/taalprofiel/antwoorden/:id", useMethod(taalprofielAntwoordenController.delete));

  const foutenanalyseOnderdeelController = new FoutenanalyseOnderdeelController();
  adminRouter.get("/foutenanalyse/onderdelen", useMethod(foutenanalyseOnderdeelController.all));
  adminRouter.get("/foutenanalyse/onderdelen/:id", useMethod(foutenanalyseOnderdeelController.find));
  adminRouter.post("/foutenanalyse/onderdeel", useMethod(foutenanalyseOnderdeelController.create));
  adminRouter.patch("/foutenanalyse/onderdelen/:id", useMethod(foutenanalyseOnderdeelController.update));
  adminRouter.delete("/foutenanalyse/onderdelen/:id", useMethod(foutenanalyseOnderdeelController.delete));

  const foutenanalyseFoutenController = new FoutenanalyseFoutenController();
  adminRouter.get("/foutenanalyse/fouten", useMethod(foutenanalyseFoutenController.all));
  adminRouter.get("/foutenanalyse/fouten/:id", useMethod(foutenanalyseFoutenController.find));
  adminRouter.post("/foutenanalyse/fouten", useMethod(foutenanalyseFoutenController.create));
  adminRouter.patch("/foutenanalyse/fouten/:id", useMethod(foutenanalyseFoutenController.update));
  adminRouter.delete("/foutenanalyse/fouten/:id", useMethod(foutenanalyseFoutenController.delete));

  const woordenschatOnderdeelController = new WoordenschatOnderdeelController();
  adminRouter.get("/woordenschat/onderdelen", useMethod(woordenschatOnderdeelController.all));
  adminRouter.get("/woordenschat/onderdelen/:id", useMethod(woordenschatOnderdeelController.find));
  adminRouter.post("/woordenschat/onderdelen", useMethod(woordenschatOnderdeelController.create));
  adminRouter.patch("/woordenschat/onderdelen/:id", useMethod(woordenschatOnderdeelController.update));
  adminRouter.delete("/woordenschat/onderdelen/:id", useMethod(woordenschatOnderdeelController.delete));

  const woordenschatWoordController = new WoordenschatWoordController();
  adminRouter.get("/woordenschat/woorden", useMethod(woordenschatWoordController.all));
  adminRouter.get("/woordenschat/woorden/:id", useMethod(woordenschatWoordController.find));
  adminRouter.post("/woordenschat/woorden", useMethod(woordenschatWoordController.create));
  adminRouter.patch("/woordenschat/woorden/:id", useMethod(woordenschatWoordController.update));
  adminRouter.delete("/woordenschat/woorden/:id", useMethod(woordenschatWoordController.delete));

  const vaardighedenCriteriaController = new VaardighedenCriteriaController();
  adminRouter.get("/vaardigheden/criteria", useMethod(vaardighedenCriteriaController.all));
  adminRouter.get("/vaardigheden/criteria/:id", useMethod(vaardighedenCriteriaController.find));
  adminRouter.post("/vaardigheden/criteria", useMethod(vaardighedenCriteriaController.create));
  adminRouter.patch("/vaardigheden/criteria/:id", useMethod(vaardighedenCriteriaController.update));
  adminRouter.delete("/vaardigheden/criteria/:id", useMethod(vaardighedenCriteriaController.delete));

  const vaardighedenOnderdeelController = new VaardighedenOnderdeelController();
  adminRouter.get("/vaardigheden/onderdelen", useMethod(vaardighedenOnderdeelController.all));
  adminRouter.get("/vaardigheden/onderdelen/:id", useMethod(vaardighedenOnderdeelController.find));
  adminRouter.post("/vaardigheden/onderdelen", useMethod(vaardighedenOnderdeelController.create));
  adminRouter.patch("/vaardigheden/onderdelen/:id", useMethod(vaardighedenOnderdeelController.update));
  adminRouter.delete("/vaardigheden/onderdelen/:id", useMethod(vaardighedenOnderdeelController.delete));

  const vaardighedenEvaluatieController = new VaardighedenEvaluatieController();
  adminRouter.get("/vaardigheden/evaluaties", useMethod(vaardighedenEvaluatieController.all));
  adminRouter.get("/vaardigheden/evaluaties/:id", useMethod(vaardighedenEvaluatieController.find));
  adminRouter.post("/vaardigheden/evaluaties", useMethod(vaardighedenEvaluatieController.create));
  adminRouter.patch("/vaardigheden/evaluaties/:id", useMethod(vaardighedenEvaluatieController.update));
  adminRouter.delete("/vaardigheden/evaluaties/:id", useMethod(vaardighedenEvaluatieController.delete));

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
