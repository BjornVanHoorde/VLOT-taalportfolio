import { NextFunction, Response } from "express";
import { TaalOptions, VaardigheidOptions } from "../../constants";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import KlasService from "../Klas/Klas.service";
import TaaltipLeerlingService from "../TaaltipLeerling/TaaltipLeerling.service";
import TaaltipService from "./Taaltip.service";
import { TaaltipBody } from "./Taaltip.types";

export default class TaaltipController {
  private taaltipService: TaaltipService;
  private klasService: KlasService;
  private TaaltipsLeerlingService: TaaltipLeerlingService;

  constructor() {
    this.taaltipService = new TaaltipService();
    this.klasService = new KlasService();
    this.TaaltipsLeerlingService = new TaaltipLeerlingService();
  }

  all = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const taaltips = await this.taaltipService.all({ ...req.body });
    return res.json(taaltips);
  };

  allByClass = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    // Students cannot see taaltips of other classes
    if (req.user.isStudent()) {
      req.params.id = req.user.klas.id;
    }

    const taaltips = await this.taaltipService.byClass(req.params.id);
    return res.json(taaltips);
  };

  allByLanguage = async (
    req: AuthRequest<{ language: TaalOptions }>,
    res: Response,
    next: NextFunction
  ) => {
    const taaltips = await this.taaltipService.byLanguage(req.params.language);
    return res.json(taaltips);
  };

  allBySkill = async (
    req: AuthRequest<{ skill: VaardigheidOptions }>,
    res: Response,
    next: NextFunction
  ) => {
    const taaltips = await this.taaltipService.bySkill(req.params.skill);
    return res.json(taaltips);
  };

  allByClassLanguageSkill = async (
    req: AuthRequest<{ id: number, language: TaalOptions, skill: VaardigheidOptions }>,
    res: Response,
    next: NextFunction
  ) => {
    const { id, language, skill } =  req.params
    const taaltips = await this.taaltipService.byClassLanguageSkill(id, language, skill);
    return res.json(taaltips);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const taaltip = await this.taaltipService.findOne(req.params.id);

    if (!taaltip) {
      next(new NotFoundError());
    }
    return res.json(taaltip);
  };

  create = async (
    req: AuthRequest<{}, {}, TaaltipBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    const leerlingen =  (await this.klasService.findOne(body.klas.id)).leerlingen;
    const taaltip = await this.taaltipService.create(body);

    // If there is new taaltip,
    // insert an empty answer to all the students who are in the class with the new taaltip
    leerlingen.forEach( async (leerling) => {
      await this.TaaltipsLeerlingService.create({
        taaltip,
        leerling,
        taaltipId: taaltip.id,
        leerlingId: leerling.id,
        antwoord: "-",
      })
    });

    return res.json(taaltip);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, TaaltipBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;
    body.id = parseInt(req.params.id);

    try {
      const taaltip = await this.taaltipService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!taaltip) {
        next(new NotFoundError());
      }
      return res.json(taaltip);
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
      const taaltip = await this.taaltipService.delete(parseInt(req.params.id));
      if (!taaltip) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (e) {
      next(e);
    }
  };
}
