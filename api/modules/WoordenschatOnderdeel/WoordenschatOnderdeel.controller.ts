import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import WoordenschatOnderdeelService from "./WoordenschatOnderdeel.service";
import woordenschatOnderdeelService from "./WoordenschatOnderdeel.service";
import { WoordenschatOnderdeelBody } from "./WoordenschatOnderdeel.types";

export default class WoordenschatOnderdeelController {
  private woordenschatOnderdeelService: WoordenschatOnderdeelService;

  constructor() {
    this.woordenschatOnderdeelService = new WoordenschatOnderdeelService();
  }

  all = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const woordenschatOnderdelen = await this.woordenschatOnderdeelService.all({ ...req.body });
    return res.json(woordenschatOnderdelen);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const woordenschatOnderdeel = await this.woordenschatOnderdeelService.findOne(req.params.id);

    if (!woordenschatOnderdeel) {
      next(new NotFoundError());
    }
    return res.json(woordenschatOnderdeel);
  };

  create = async (
    req: AuthRequest<{}, {}, WoordenschatOnderdeelBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    const woordenschatOnderdeel = await this.woordenschatOnderdeelService.create(body);

    return res.json(woordenschatOnderdeel);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, WoordenschatOnderdeelBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;
    body.id = parseInt(req.params.id);

    try {
      const woordenschatOnderdeel = await this.woordenschatOnderdeelService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!woordenschatOnderdeel) {
        next(new NotFoundError());
      }
      return res.json(woordenschatOnderdeel);
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
      const woordenschatOnderdeel = await this.woordenschatOnderdeelService.delete(parseInt(req.params.id));
      if (!woordenschatOnderdeel) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (e) {
      next(e);
    }
  };
}
