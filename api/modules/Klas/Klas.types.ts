import { KlasGrade } from "./Klas.constants";

export interface KlasBody {
  id?: number;
  klas: string;
  graad: KlasGrade;
}
