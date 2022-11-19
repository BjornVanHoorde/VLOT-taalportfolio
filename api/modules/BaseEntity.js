import { validateOrReject } from "class-validator";
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";
import ValidationError from "../errors/ValidationError";

export class BaseEntity {
  @CreateDateColumn({ select: false })
  createdAt;

  @UpdateDateColumn({ select: false })
  updatedAt;

  @DeleteDateColumn({ select: false })
  deletedAt;

  @BeforeInsert()
  async validateCreate() {
    try {
      await validateOrReject(this, { groups: ["create"] });
    } catch (errors) {
      // Collect validation errors in object
      const validationErrors = {};
      for (const e of errors) {
        validationErrors[e.property] = e.constraints;
      }
      throw new ValidationError(validationErrors);
    }
  }

  @BeforeUpdate()
  async validateUpdate() {
    try {
      await validateOrReject(this, { groups: ["update"] });
    } catch (errors) {
      // Collect validation errors in object
      const validationErrors = {};
      for (const e of errors) {
        validationErrors[e.property] = e.constraints;
      }
      throw new ValidationError(validationErrors);
    }
  }
}
