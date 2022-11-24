import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { compare, hash } from "bcrypt";
import { IsDefined, isEmail } from "class-validator";
import { BaseEntity } from "../BaseEntity";
import { UserRole } from "./User.constants";

const { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } = require("typeorm");

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  idn

  @IsDefined({ always: true })
  @Column()
  firstName;

  @IsDefined({ always:true })
  @Column()
  lastName;

  @IsDefined({ always: true })
  @isEmail(undefined, { unique: true })
  @Column()
  email;

  @IsDefined({ groups: ["create"] })
  @Column({ select: false })
  password;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  role;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }

  async checkPassword(password) {
    return await compare(password, this.password);
  }

  isAdmin() {
    return this.role === UserRole.Admin;
  }

  isStudent() {
    return this.role === UserRole.Student;
  }

  isTeacher() {
    return this.role === UserRole.Teacher;
  }
}