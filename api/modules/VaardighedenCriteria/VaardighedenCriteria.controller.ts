import { NextFunction, Response } from "express";
import ForbiddenError from "../../errors/ForbiddenError";
import NotFoundError from "../../errors/NotFoundError";
import { AuthRequest } from "../../middleware/auth/auth.types";
import VaardighedenCriteriaService from "./VaardighedenCriteria.service";
import { VaardighedenCriteriaBody } from "./VaardighedenCriteria.types";

export default class VaardighedenCriteriaController {
  private vaardighedenCriteriaService: VaardighedenCriteriaService;

  constructor() {
    this.vaardighedenCriteriaService = new VaardighedenCriteriaService();
  }

  all = async (
    req: AuthRequest<{}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user.isAdmin()) {
      return new ForbiddenError();
    }

    const vaardighedenCriteria = await this.vaardighedenCriteriaService.all({
      ...req.body,
    });
    return res.json(vaardighedenCriteria);
  };

  find = async (
    req: AuthRequest<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user.isAdmin()) {
      return new ForbiddenError();
    }

    const vaardighedenCriteria = await this.vaardighedenCriteriaService.findOne(
      req.params.id
    );

    if (!vaardighedenCriteria) {
      next(new NotFoundError());
    }
    return res.json(vaardighedenCriteria);
  };

  create = async (
    req: AuthRequest<{}, {}, VaardighedenCriteriaBody>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user.isAdmin()) {
      return new ForbiddenError();
    }

    const { body } = req;

    const vaardighedenCriteria = await this.vaardighedenCriteriaService.create(
      body
    );

    return res.json(vaardighedenCriteria);
  };

  update = async (
    req: AuthRequest<{ id: string }, {}, VaardighedenCriteriaBody>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user.isAdmin()) {
      return new ForbiddenError();
    }

    const { body } = req;
    body.id = parseInt(req.params.id);

    try {
      const vaardighedenCriteria =
        await this.vaardighedenCriteriaService.update(
          parseInt(req.params.id),
          req.body
        );
      if (!vaardighedenCriteria) {
        next(new NotFoundError());
      }
      return res.json(vaardighedenCriteria);
    } catch (e) {
      next(e);
    }
  };

  delete = async (
    req: AuthRequest<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user.isAdmin()) {
      return new ForbiddenError();
    }

    try {
      const vaardighedenCriteria =
        await this.vaardighedenCriteriaService.delete(parseInt(req.params.id));
      if (!vaardighedenCriteria) {
        next(new NotFoundError());
      }
      return res.json({});
    } catch (e) {
      next(e);
    }
  };
}
