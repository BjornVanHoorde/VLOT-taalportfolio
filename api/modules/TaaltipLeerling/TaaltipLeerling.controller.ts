import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import TaaltipLeerlingService from "./TaaltipLeerling.service";
import { TaaltipLeerlingBody } from "./TaaltipLeerling.types";

export default class TaaltipLeerlingController {
  private taaltipLeerlingService: TaaltipLeerlingService;

  constructor() {
    this.taaltipLeerlingService = new TaaltipLeerlingService();
  }

  all = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const antwoorden = await this.taaltipLeerlingService.all({ ...req.body });
    return res.json(antwoorden);
  };

  allByStudent = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const antwoorden = await this.taaltipLeerlingService.byStudent(req.params.id);
    return res.json(antwoorden);
  };

  allByTaaltip = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const antwoorden = await this.taaltipLeerlingService.byTaaltip(req.params.id);
    return res.json(antwoorden);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const antwoord = await this.taaltipLeerlingService.findOne(req.params.id);

    if (!antwoord) {
      next(new NotFoundError());
    }
    return res.json(antwoord);
  };

  create = async (
    req: AuthRequest<{}, {}, TaaltipLeerlingBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    const antwoord = await this.taaltipLeerlingService.create(body);
    return res.json(antwoord);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, TaaltipLeerlingBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;
    body.id = parseInt(req.params.id);

    try {
      const antwoord = await this.taaltipLeerlingService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!antwoord) {
        next(new NotFoundError());
      }
      return res.json(antwoord);
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
      const antwoord = await this.taaltipLeerlingService.delete(parseInt(req.params.id));
      if (!antwoord) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (e) {
      next(e);
    }
  };
}
