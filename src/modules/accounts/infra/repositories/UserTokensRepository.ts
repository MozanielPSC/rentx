import { getRepository, Repository } from "typeorm";
import { ICreateUserTokensDTO } from "../../dtos/ICreateUserTokensDTO";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";
import { UserTokens } from "../typeorm/entities/UserTokens";

class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>;
  constructor() {
    this.repository = getRepository(UserTokens);
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return await this.repository.findOne({ refresh_token });
  }
  async deleteById(id: string): Promise<void> {
    this.repository.delete(id);
  }
  async findByUserId(user_id: string, refresh_token: string): Promise<UserTokens> {
    return await this.repository.findOne({ user_id, refresh_token });

  }
  async create({ user_id, expires_date, refresh_token }: ICreateUserTokensDTO): Promise<UserTokens> {
    const userToken = await this.repository.create({
      user_id,
      expires_date,
      refresh_token
    });
    await this.repository.save(userToken);
    return userToken;


  }

}

export { UserTokensRepository }