import { NextFunction, Response } from "express";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import FoutenanalyseOnderdeelService from "./FoutenanalyseOnderdeel.service";
import { FoutenanalyseOnderdeelBody } from "./FoutenanalyseOnderdeel.types";

export default class FoutenanalyseOnderdeelController {
  private foutenanalyseOnderdeelService: FoutenanalyseOnderdeelService;

  constructor() {
    this.foutenanalyseOnderdeelService = new FoutenanalyseOnderdeelService();
  }

  all = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const foutenanalyseOnderdelen = await this.foutenanalyseOnderdeelService.all({ ...req.body });
    return res.json(foutenanalyseOnderdelen);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const foutenanalyseOnderdeel = await this.foutenanalyseOnderdeelService.findOne(req.params.id);

    if (!foutenanalyseOnderdeel) {
      next(new NotFoundError());
    }
    return res.json(foutenanalyseOnderdeel);
  };

  create = async (
    req: AuthRequest<{}, {}, FoutenanalyseOnderdeelBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    const foutenanalyseOnderdeel = await this.foutenanalyseOnderdeelService.create(body);

    return res.json(foutenanalyseOnderdeel);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, FoutenanalyseOnderdeelBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;
    body.id = parseInt(req.params.id);

    try {
      const foutenanalyseOnderdeel = await this.foutenanalyseOnderdeelService.update(
        parseInt(req.params.id),
        req.body
      );
      if (!foutenanalyseOnderdeel) {
        next(new NotFoundError());
      }
      return res.json(foutenanalyseOnderdeel);
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
      const foutenanalyseOnderdeel = await this.foutenanalyseOnderdeelService.delete(parseInt(req.params.id));
      if (!foutenanalyseOnderdeel) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (e) {
      next(e);
    }
  };
}
