import { NextFunction, Response } from "express";
import ForbiddenError from "../../errors/ForbiddenError";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import { UserRole } from "./User.constants";
import UserService from "./User.service";
import { UserBody } from "./User.types";

export default class UserController {
  private userService: UserService;

  constructor() {
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
    const users = await this.userService.all({ ...req.body });
    return res.json(users);
  };

  allTeachers = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user.isAdmin()) {
      return new ForbiddenError();
    }
    const teachers = await this.userService.teachers();
    return res.json(teachers);
  };

  allStudents = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user.isAdmin()) {
      return new ForbiddenError();
    }
    const students = await this.userService.students();
    return res.json(students);
  };

  allStudentsByClass = async (
    req: AuthRequest<{ id: number }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { params } = req;

    if (req.user.isStudent()) {
      return new ForbiddenError();
    }

    const students = await this.userService.studentsByClass(params.id);
    return res.json(students);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    // Students cannot see info of other users
    if (req.user.isStudent()) {
      req.params.id = req.user.id;
    }

    let user: UserBody;
    user = await this.userService.findOne(req.params.id);

    // If the user is a teacher and the found user is also a teacher or an admin
    // than forbid them from viewing the info
    if (req.user.isTeacher) {
      if (user.rol === UserRole.Teacher || user.rol === UserRole.Admin) {
        req.params.id = req.user.id;
        user = await this.userService.findOne(req.params.id);
      }
    }
    if (!user) {
      next(new NotFoundError());
    }
    return res.json(user);
  };

  create = async (
    req: AuthRequest<{}, {}, UserBody>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user.isAdmin()) {
      return new ForbiddenError();
    }

    const { body } = req;
    body.rol = body.rol;

    const user = await this.userService.create(body);
    return res.json(user);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, UserBody>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user.isAdmin()) {
      return new ForbiddenError();
    }

    const { body } = req;
    body.id = parseInt(req.params.id);

    try {
      const user = await this.userService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!user) {
        next(new NotFoundError());
      }
      return res.json(user);
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
      const user = await this.userService.delete(parseInt(req.params.id));
      if (!user) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (e) {
      next(e);
    }
  };
}
