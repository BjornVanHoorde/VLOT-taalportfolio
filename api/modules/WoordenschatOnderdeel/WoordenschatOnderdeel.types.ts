import { TaalOptions } from "../../constants";
import User from "../User/User.entity";

export interface WoordenschatOnderdeelBody {
  id?: number;
  naam: string;
  leerlingId: number;
  leerling: User;
  taal: TaalOptions;
  feedback: string;
}