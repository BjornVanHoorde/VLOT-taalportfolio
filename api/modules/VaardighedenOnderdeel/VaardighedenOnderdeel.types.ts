import { TaalOptions, VaardigheidOptions } from "../../constants";
import User from "../User/User.entity";

export interface VaardighedenOnderdeelBody {
  id?: number;
  naam: string;
  leerlingId: number;
  leerling: User;
  taal: TaalOptions;
  vaardigheid: VaardigheidOptions;
  feedback: string;
}