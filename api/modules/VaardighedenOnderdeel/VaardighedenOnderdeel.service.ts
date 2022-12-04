import { Repository } from "typeorm";
import { AppDataSource } from "../../database/DatabaseSource";
import VaardighedenOnderdeel from "./VaardighedenOnderdeel.entity";
import { VaardighedenOnderdeelBody } from "./VaardighedenOnderdeel.types";

export default class VaardighedenOnderdeelService {
  private repository: Repository<VaardighedenOnderdeel>;

  constructor() {
    const repository = AppDataSource.getRepository(VaardighedenOnderdeel);
    this.repository = repository;
  }

  all = async (options: object) => {
    const vaardighedenOnderdelen = await this.repository.find({
      where: options,
      // relations: ["leerling", "woorden"],
    });
    return vaardighedenOnderdelen;
  };

  findOne = async (id: number) => {
    const vaardighedenOnderdeel = await this.repository.findOne({
      where: { id },
      // relations: ["leerling", "woorden"],
    });
    return vaardighedenOnderdeel;
  };

  findOneBy = async (options: object) => {
    const vaardighedenOnderdeel = await this.repository.findOneBy(options);
    return vaardighedenOnderdeel;
  };

  create = async (body: VaardighedenOnderdeelBody) => {
    const vaardighedenOnderdeel = await this.repository.save(
      this.repository.create(body)
    );
    return vaardighedenOnderdeel;
  };

  update = async (id: number, body: VaardighedenOnderdeelBody) => {
    let vaardighedenOnderdeel = await this.findOne(id);
    if (vaardighedenOnderdeel) {
      vaardighedenOnderdeel = await this.repository.save({
        ...vaardighedenOnderdeel,
        ...body,
      });
    }
    return vaardighedenOnderdeel;
  };

  delete = async (id: number) => {
    let vaardighedenOnderdeel = await this.findOne(id);
    if (vaardighedenOnderdeel) {
      await this.repository.softDelete({ id });
    }
    return vaardighedenOnderdeel;
  };
}
