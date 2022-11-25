import { TaalOptions, VaardigheidOptions } from "../../constants";

export interface TaaltipBody {
  id?: number;
  tip: string;
  taal: TaalOptions;
  vaardigheid: VaardigheidOptions;
  klasId: number;
}
