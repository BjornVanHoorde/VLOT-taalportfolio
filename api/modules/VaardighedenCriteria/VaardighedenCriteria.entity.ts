import { IsDefined } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GradeOptions, TaalOptions, VaardigheidOptions } from "../../constants";
import { BaseEntity } from "../BaseEntity";
import TaalprofielAntwoord from "../TaalprofielAntwoord/TaalprofielAntwoord.entity";

@Entity()
export default class VaardighedenCriteria extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDefined({ always: true })
  @Column()
  criteria: string;

  @IsDefined({ always: true })
  @Column()
  vaardigheid: VaardigheidOptions;

  @IsDefined({ always: true })
  @Column()
  taal: TaalOptions;

  @IsDefined({ always: true })
  @Column()
  graad: GradeOptions;

  // @OneToMany(() => TaalprofielAntwoord, (antwoord) => antwoord.vraag)
  // taalprofielAntwoorden: TaalprofielAntwoord[];
}
