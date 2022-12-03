import { IsDefined } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaalOptions } from "../../constants";
import { BaseEntity } from "../BaseEntity";
import User from "../User/User.entity";

@Entity()
export default class FoutenanalyseOnderdeel extends BaseEntity {
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

  @ManyToOne(() => User, (leerling) => leerling.foutenanalyseOnderdelen)
  leerling: User;
}