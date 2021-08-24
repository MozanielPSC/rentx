import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";
import auth from "../../../../config/auth";
import { useContainer } from "typeorm";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string,
    email: string
  };
  token: string;
  refresh_token:string;
}
@injectable()
class AutenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("UserTokensRepository") private userTokenRepository: IUserTokensRepository,
    @inject("DayjsDateProvider") private dayjsDateProvider: IDateProvider
  ) { }
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Verify your email or password", 400);
    }
    const passwordVerify = await compare(password, user.password);
    if (!passwordVerify) {
      throw new AppError("Verify your email or password", 400);
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token
    });

    const refresh_token = sign({
      email
    }, auth.secret_refresh_token,
      {
        subject: user.id,
        expiresIn: auth.expires_in_refresh_token
      }
    );
    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      auth.expires_refresh_token_days
    )
    await this.userTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      },
      refresh_token
    }

    return tokenReturn;

  }
}
export { AutenticateUserUseCase }