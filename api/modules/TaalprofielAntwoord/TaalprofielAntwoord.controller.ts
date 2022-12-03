import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import TaalprofielAntwoordService from "./TaalprofielAntwoord.service";
import { TaalprofielAntwoordBody } from "./TaalprofielAntwoord.types";

export default class TaalprofielAntwoordController {
  private taalprofielAntwoordService: TaalprofielAntwoordService;

  constructor() {
    this.taalprofielAntwoordService = new TaalprofielAntwoordService();
  }

  all = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const taalprofielAntwoorden = await this.taalprofielAntwoordService.all({ ...req.body });
    return res.json(taalprofielAntwoorden);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const taalprofielAntwoord = await this.taalprofielAntwoordService.findOne(req.params.id);

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
    const { body } = req;

    const taalprofielAntwoord = await this.taalprofielAntwoordService.create(body);

    return res.json(taalprofielAntwoord);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, TaalprofielAntwoordBody>,
    res: Response,
    next: NextFunction
  ) => {
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
    try {
      const taalprofielAntwoord = await this.taalprofielAntwoordService.delete(parseInt(req.params.id));
      if (!taalprofielAntwoord) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (e) {
      next(e);
    }
  };
}
