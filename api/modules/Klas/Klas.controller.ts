import { NextFunction, Response } from "express";
import { GradeOptions } from "../../constants";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import KlasService from "./Klas.service";
import { KlasBody } from "./Klas.types";

export default class KlasController {
  private klasService: KlasService;

  constructor() {
    this.klasService = new KlasService();
  }

  all = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const klassen = await this.klasService.all({ ...req.body });
    return res.json(klassen);
  };

  allByGrade = async (
    req: AuthRequest<{ grade: GradeOptions }>,
    res: Response,
    next: NextFunction
  ) => {
    const klassen = await this.klasService.byGrade(req.params.grade);
    return res.json(klassen);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    // Students cannot see info of other classes
    if (req.user.isStudent()) {
      req.params.id = req.user.klas.id;
    }

    const klas = await this.klasService.findOne(req.params.id);

    if (!klas) {
      next(new NotFoundError());
    }
    return res.json(klas);
  };

  create = async (
    req: AuthRequest<{}, {}, KlasBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    const klas = await this.klasService.create(body);
    return res.json(klas);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, KlasBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;
    body.id = parseInt(req.params.id);

    try {
      const klas = await this.klasService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!klas) {
        next(new NotFoundError());
      }
      return res.json(klas);
    } catch (e) {
      next(e);
    }
  };

  delete = async (
    req: AuthRequest<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const klas = await this.klasService.delete(parseInt(req.params.id));
      if (!klas) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (e) {
      next(e);
    }
  };
}
