import { Repository } from "typeorm";
import { AppDataSource } from "../../database/DatabaseSource";
import TaalprofielAntwoord from "./TaalprofielAntwoord.entity";
import { TaalprofielAntwoordBody } from "./TaalprofielAntwoord.types";

export default class TaalprofielAntwoordService {
  private repository: Repository<TaalprofielAntwoord>;

  constructor() {
    const repository = AppDataSource.getRepository(TaalprofielAntwoord);
    this.repository = repository;
  }

  all = async (options: object) => {
    const taalprofielAntwoorden = await this.repository.find({
      where: options,
      relations: ["vraag", "leerling"],
    });
    return taalprofielAntwoorden;
  };

  findOne = async (id: number) => {
    const taalprofielAntwoord = await this.repository.findOne({
      where: { id },
      relations: ["vraag", "leerling"],
    });
    return taalprofielAntwoord;
  };

  findOneBy = async (options: object) => {
    const taalprofielAntwoord = await this.repository.findOneBy(options);
    return taalprofielAntwoord;
  };

  create = async (body: TaalprofielAntwoordBody) => {
    const taalprofielAntwoord = await this.repository.save(
      this.repository.create(body)
    );
    return taalprofielAntwoord;
  };

  update = async (id: number, body: TaalprofielAntwoordBody) => {
    let taalprofielAntwoord = await this.findOne(id);
    if (taalprofielAntwoord) {
      taalprofielAntwoord = await this.repository.save({
        ...taalprofielAntwoord,
        ...body,
      });
    }
    return taalprofielAntwoord;
  };

  delete = async (id: number) => {
    let taalprofielAntwoord = await this.findOne(id);
    if (taalprofielAntwoord) {
      await this.repository.softDelete({ id });
    }
    return taalprofielAntwoord;
  };
}
