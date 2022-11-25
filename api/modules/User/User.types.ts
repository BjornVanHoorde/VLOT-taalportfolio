import { UserRole } from "./User.constants";

export interface UserBody {
  id?: number;
  voornaam: string;
  achternaam: string;
  email: string;
  rol: UserRole;
  password?: string;
  klas_id?: number;
}