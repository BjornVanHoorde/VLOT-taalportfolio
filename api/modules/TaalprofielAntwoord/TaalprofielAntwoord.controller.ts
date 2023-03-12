import { NextFunction, Response } from "express";
import { TaalOptions } from "../../constants";
import ForbiddenError from "../../errors/ForbiddenError";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import {
  CheckTeacherClasses,
  convertTeacherYear,
  convertYear,
  getGrade,
} from "../../utils";
import KlasService from "../Klas/Klas.service";
import UserService from "../User/User.service";
import TaalprofielAntwoordService from "./TaalprofielAntwoord.service";
import { TaalprofielAntwoordBody } from "./TaalprofielAntwoord.types";

export default class TaalprofielAntwoordController {
  private taalprofielAntwoordService: TaalprofielAntwoordService;
  private userService: UserService;

  constructor() {
    this.taalprofielAntwoordService = new TaalprofielAntwoordService();
    this.userService = new UserService();
  }

  all = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user.isAdmin()) {
      return new ForbiddenError();
    }

    const taalprofielAntwoorden = await this.taalprofielAntwoordService.all({
      ...req.body,
    });
    return res.json(taalprofielAntwoorden);
  };

  byStudent = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    if (req.user.isStudent()) {
      req.params.id = req.user.id;
    }

    if (req.user.isTeacher()) {
      const klasId = (await this.userService.findOne(req.params.id)).klas.id;
      if (!(await CheckTeacherClasses(req.user.id, klasId))) {
        next(new ForbiddenError());
      }
    }

    const taalprofielAntwoorden =
      await this.taalprofielAntwoordService.byStudent(req.params.id);
    return res.json(taalprofielAntwoorden);
  };

  byStudentLanguage = async (
    req: AuthRequest<{
      id: number;
      language: TaalOptions;
      selectedYear: string;
    }>,
    res: Response,
    next: NextFunction
  ) => {
    const grade = getGrade(req.params.selectedYear);

    if (req.user.isStudent()) {
      req.params.id = req.user.id;
    }

    if (req.user.isTeacher()) {
      const klasId = (await this.userService.findOne(req.params.id)).klas.id;
      if (!(await CheckTeacherClasses(req.user.id, klasId))) {
        next(new ForbiddenError());
      }
    }

    const taalprofielAntwoorden =
      await this.taalprofielAntwoordService.byStudentLanguage(
        req.params.id,
        req.params.language,
        Number(req.params.selectedYear),
        grade
      );
    return res.json(taalprofielAntwoorden);
  };

  byStudentName = async (
    req: AuthRequest<{
      student: string;
      language: TaalOptions;
      year: string;
    }>,
    res: Response,
    next: NextFunction
  ) => {
    if (req.user.isStudent()) {
      return new ForbiddenError();
    }

    const firstName = req.params.student.split(" ")[0];
    const lastName = req.params.student.split(" ")[1];
    const studentData = await this.userService.byStudentName(
      firstName,
      lastName
    );

    if (req.user.isTeacher()) {
      if (!(await CheckTeacherClasses(req.user.id, studentData[0].klas.id))) {
        next(new ForbiddenError());
      }
    }

    const selectedYear = convertTeacherYear(
      req.params.year,
      studentData[0].klas.klas
    );
    const grade = getGrade(String(selectedYear));

    const taalprofielAntwoorden =
      await this.taalprofielAntwoordService.byStudentLanguage(
        studentData[0].id,
        req.params.language,
        selectedYear,
        grade
      );
    return res.json(taalprofielAntwoorden);
  };

  byClass = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    if (req.user.isStudent()) {
      return new ForbiddenError();
    }

    if (req.user.isTeacher()) {
      if (!(await CheckTeacherClasses(req.user.id, req.params.id))) {
        next(new ForbiddenError());
      }
    }

    const taalprofielAntwoorden = await this.taalprofielAntwoordService.byClass(
      req.params.id
    );
    return res.json(taalprofielAntwoorden);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user.isAdmin()) {
      return new ForbiddenError();
    }

    const taalprofielAntwoord = await this.taalprofielAntwoordService.findOne(
      req.params.id
    );

    if (!taalprofielAntwoord) {
      next(new NotFoundError());
    }
    return res.json(taalprofielAntwoord);
  };

  create = async (
    req: AuthRequest<{}, {}, TaalprofielAntwoordBody>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user.isAdmin()) {
      return new ForbiddenError();
    }

    const { body } = req;

    const taalprofielAntwoord = await this.taalprofielAntwoordService.create(
      body
    );

    return res.json(taalprofielAntwoord);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, TaalprofielAntwoordBody>,
    res: Response,
    next: NextFunction
  ) => {
    if (req.user.isTeacher()) {
      return new ForbiddenError();
    }

    const { body } = req;
    body.id = parseInt(req.params.id);

    try {
      const taalprofielAntwoord = await this.taalprofielAntwoordService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!taalprofielAntwoord) {
        next(new NotFoundError());
      }
      return res.json(taalprofielAntwoord);
    } catch (e) {
      next(e);
    }
  };

  delete = async (
    req: AuthRequest<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user.isAdmin()) {
      return new ForbiddenError();
    }

    try {
      const taalprofielAntwoord = await this.taalprofielAntwoordService.delete(
        parseInt(req.params.id)
      );
      if (!taalprofielAntwoord) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (e) {
      next(e);
    }
  };
}
