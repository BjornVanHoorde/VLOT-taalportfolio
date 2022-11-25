import { IsDefined } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../BaseEntity";
import User from "../User/User.entity";
import { KlasGrade } from "./Klas.constants";

@Entity()
export default class Klas extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined({ always: true })
  @Column({ unique: true })
  klas: string;

  @IsDefined({ always: true })
  @Column()
  graad: KlasGrade;

  @OneToMany(() => User, (user) => user.klas)
  leerlingen: User[];
}
