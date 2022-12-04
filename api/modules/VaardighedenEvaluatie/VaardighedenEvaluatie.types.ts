import VaardighedenCriteria from "../VaardighedenCriteria/VaardighedenCriteria.entity";
import VaardighedenOnderdeel from "../VaardighedenOnderdeel/VaardighedenOnderdeel.entity";

export interface VaardighedenEvaluatieBody {
  id?: number;
  antwoord: string;
  criteriaId: number;
  criteria: VaardighedenCriteria;
  onderdeelId: number;
  onderdeel: VaardighedenOnderdeel;
}
