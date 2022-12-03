import TaalprofielVraag from "../TaalprofielVraag/TaalprofielVraag.entity";
import User from "../User/User.entity";

export interface TaalprofielAntwoordBody {
  id?: number;
  antwoord: string;
  vraagId: number;
  vraag: TaalprofielVraag;
  leerlingId: number;
  leerling: User;
}
