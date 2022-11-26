import "reflect-metadata";
import { DataSource } from "typeorm";
import Klas from "../modules/Klas/Klas.entity";
import Taaltip from "../modules/Taaltip/Taaltip.entity";
import TaaltipLeerling from "../modules/TaaltipLeerling/TaaltipLeerling.entity";
import User from "../modules/User/User.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Klas, Taaltip, TaaltipLeerling],
  migrations: [],
  subscribers: [],
  ssl:
    process.env.ENV === "PRODUCTION"
      ? {
          rejectUnauthorized: false,
        }
      : false,
});
