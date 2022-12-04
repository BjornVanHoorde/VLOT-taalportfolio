import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import VaardighedenOnderdeelService from "./VaardighedenOnderdeel.service";
import { VaardighedenOnderdeelBody } from "./VaardighedenOnderdeel.types";

export default class VaardighedenOnderdeelController {
  private vaardighedenOnderdeelService: VaardighedenOnderdeelService;

  constructor() {
    this.vaardighedenOnderdeelService = new VaardighedenOnderdeelService();
  }

  all = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const vaardighedenOnderdelen = await this.vaardighedenOnderdeelService.all({ ...req.body });
    return res.json(vaardighedenOnderdelen);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const vaardighedenOnderdeel = await this.vaardighedenOnderdeelService.findOne(req.params.id);

    if (!vaardighedenOnderdeel) {
      next(new NotFoundError());
    }
    return res.json(vaardighedenOnderdeel);
  };

  create = async (
    req: AuthRequest<{}, {}, VaardighedenOnderdeelBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    const vaardighedenOnderdeel = await this.vaardighedenOnderdeelService.create(body);

    return res.json(vaardighedenOnderdeel);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, VaardighedenOnderdeelBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;
    body.id = parseInt(req.params.id);

    try {
      const vaardighedenOnderdeel = await this.vaardighedenOnderdeelService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!vaardighedenOnderdeel) {
        next(new NotFoundError());
      }
      return res.json(vaardighedenOnderdeel);
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
      const vaardighedenOnderdeel = await this.vaardighedenOnderdeelService.delete(parseInt(req.params.id));
      if (!vaardighedenOnderdeel) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (e) {
      next(e);
    }
  };
}
