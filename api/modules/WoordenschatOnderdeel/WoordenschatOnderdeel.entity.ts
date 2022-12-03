import { IsDefined } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaalOptions } from "../../constants";
import { BaseEntity } from "../BaseEntity";
import User from "../User/User.entity";

@Entity()
export default class WoordenschatOnderdeel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined({ always: true })
  @Column()
  naam: string;

  @IsDefined({ always: true })
  @Column()
  taal: TaalOptions;

  @IsDefined({ always: false })
  @Column({ default: "" })
  feedback: string;

  @ManyToOne(() => User, (leerling) => leerling.woordenschatOnderdelen)
  leerling: User;

  // @OneToMany(() => WoordenschatOnderdeel, (woorden) => woorden.onderdeel)
  // woorden: WoordenschatOnderdeel[];
}