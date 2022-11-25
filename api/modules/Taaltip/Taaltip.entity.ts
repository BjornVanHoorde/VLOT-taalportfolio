import { IsDefined } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaalOptions, VaardigheidOptions } from "../../constants";
import { BaseEntity } from "../BaseEntity";
import Klas from "../Klas/Klas.entity";

@Entity()
export default class Taaltip extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined({ always: true })
  @Column()
  tip: string;

  @IsDefined({ always: true })
  @Column()
  taal: TaalOptions;

  @IsDefined({ always: true })
  @Column()
  vaardigheid: VaardigheidOptions;

  @ManyToOne(() => Klas, (klas) => klas.taaltips)
  klas: Klas;
}