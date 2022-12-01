import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import KlasLeerkrachtService from "./KlasLeerkracht.service";
import { KlasLeerkrachtBody } from "./KlasLeerkracht.types";

export default class KlasLeerkrachtController {
  private klasLeerkrachtService: KlasLeerkrachtService;

  constructor() {
    this.klasLeerkrachtService = new KlasLeerkrachtService();
  }

  all = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const klassen = await this.klasLeerkrachtService.all({ ...req.body });
    return res.json(klassen);
  };

  allByClass = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const klassen = await this.klasLeerkrachtService.byClass(req.params.id);
    return res.json(klassen);
  };

  allByTeacher = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const klassen = await this.klasLeerkrachtService.byTeacher(req.params.id);
    return res.json(klassen);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const klas = await this.klasLeerkrachtService.findOne(req.params.id);

    if (!klas) {
      next(new NotFoundError());
    }
    return res.json(klas);
  };

  create = async (
    req: AuthRequest<{}, {}, KlasLeerkrachtBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    
    body.geldigVan =  new Date(body.geldigVan)
    body.geldigTot =  new Date(body.geldigTot)

    const klas = await this.klasLeerkrachtService.create(body);
    return res.json(klas);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, KlasLeerkrachtBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;
    body.id = parseInt(req.params.id);
    body.geldigVan =  new Date(body.geldigVan)
    body.geldigTot =  new Date(body.geldigTot)

    try {
      const klas = await this.klasLeerkrachtService.update(
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
      const klas = await this.klasLeerkrachtService.delete(parseInt(req.params.id));
      if (!klas) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (e) {
      next(e);
    }
  };
}