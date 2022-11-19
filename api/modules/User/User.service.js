import { AppDataSource } from "../../database/DatabaseSource";
import User from "./User.entity";

export default class UserService {
  constructor() {
    const repository = AppDataSource.getRepository(User);
    this.repository = repository;
  }

  all = async (options) => {
    const users = await this.repository.find({
      where: options,
    });
    return users;
  };

  findOne = async (id) => {
    const user = await this.repository.findOne({
      where: { id },
    });
    return user;
  };

  findOneBy = async (options) => {
    const user = await this.repository.findOneBy(options);
    return user;
  };

  findByEmailWithPassword = async (email) => {
    const user = await this.repository
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .select("user.password")
      .getOne();
    return user;
  };

  create = async (body) => {
    const user = await this.repository.save(this.repository.create(body));
    return user;
  };

  update = async (id, body) => {
    let user = await this.findOne(id);
    if (user) {
      user = await this.repository.save({ ...user, ...body });
    }
    return user;
  };

  delete = async (id) => {
    let user = await this.findOne(id);
    if (user) {
      await this.repository.softDelete({ id });
    }
    return user;
  };
}
