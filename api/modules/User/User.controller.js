import NotFoundError from "../../errors/NotFoundError";
import { UserRole } from "./User.constants";
import UserService from "./User.service";

export default class UserController {
  constructor() {
    this.userService = new UserService();
  }

  all = async (req, res, next) => {
    const users = await this.userService.all({ ...req.body });
    return res.json(users);
  };

  find = async (req, res, next) => {
    if (!req.user.isTeacher()) {
      req.params.id = req.user.id;
    }

    const user = await this.userService.findOne(req.params.id);
    if (!user) {
      next(new NotFoundError());
    }
    return res.json(user);
  };

  create = async (req, res, next) => {
    const { body } = req;
    body.role = UserRole.Student;

    const user = await this.userService.create(body);
    return res.json(user);
  };

  update = async (req, res, next) => {
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
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const user = await this.userService.delete(parseInt(req.params.id));
      if (!user) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (e) {
      next(err);
    }
  };
}
