import { NextFunction, Response } from "express";
import { GradeOptions, TaalOptions, VaardigheidOptions } from "../../constants";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import TaalprofielVraagService from "./TaalprofielVraag.service";
import { TaalprofielVraagBody } from "./TaalprofielVraag.types";

export default class TaalprofielVraagController {
  private taalprofielVraagService: TaalprofielVraagService;

  constructor() {
    this.taalprofielVraagService = new TaalprofielVraagService();
  }

  all = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const taalprofielVragen = await this.taalprofielVraagService.all({ ...req.body });
    return res.json(taalprofielVragen);
  };

  allByGrade = async (
    req: AuthRequest<{ grade: GradeOptions }>,
    res: Response,
    next: NextFunction
  ) => {

    const taalprofielVragen = await this.taalprofielVraagService.byGrade(req.params.grade);
    return res.json(taalprofielVragen);
  };

  allByLanguage = async (
    req: AuthRequest<{ language: TaalOptions }>,
    res: Response,
    next: NextFunction
  ) => {
    const taalprofielVragen = await this.taalprofielVraagService.byLanguage(req.params.language);
    return res.json(taalprofielVragen);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const taalprofielVraag = await this.taalprofielVraagService.findOne(req.params.id);

    if (!taalprofielVraag) {
      next(new NotFoundError());
    }
    return res.json(taalprofielVraag);
  };

  create = async (
    req: AuthRequest<{}, {}, TaalprofielVraagBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    const taalprofielVraag = await this.taalprofielVraagService.create(body);

    return res.json(taalprofielVraag);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, TaalprofielVraagBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;
    body.id = parseInt(req.params.id);

    try {
      const taalprofielVraag = await this.taalprofielVraagService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!taalprofielVraag) {
        next(new NotFoundError());
      }
      return res.json(taalprofielVraag);
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
      const taalprofielVraag = await this.taalprofielVraagService.delete(parseInt(req.params.id));
      if (!taalprofielVraag) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (e) {
      next(e);
    }
  };
}
