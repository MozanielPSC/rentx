import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO";
import { getRepository, Repository } from "typeorm";
import { User } from "../typeorm/entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }


  async create({ name, driver_license, password, email, avatar, id }: ICreateUserDTO): Promise<void> {
    const user = await this.repository.create({
      name,
      driver_license,
      password,
      email,
      avatar,
      id
    });
    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const userVerify = await this.repository.findOne({ email });
    return userVerify;
  }

  async findById(id: string): Promise<User> {
    const userVerify = await this.repository.findOne(id);
    return userVerify;
  }

}

export { UsersRepository };