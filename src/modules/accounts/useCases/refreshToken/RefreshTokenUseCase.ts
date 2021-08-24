import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";
interface IPayLoad {
  sub: string;
  email: string;
}

interface ITokenResponse{
  token:string;
  refresh_token:string
}
@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository") private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider") private dayjsDateProvider: IDateProvider

  ) {

  }
  async execute(token: string):Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayLoad;
    const user_id = sub;
    const user_token = await this.userTokensRepository.findByUserId(user_id, token);
    if (!user_token) {
      throw new AppError("Token does not exists");
    }

    await this.userTokensRepository.deleteById(user_token.id);
    const refresh_token = sign({email}, auth.secret_refresh_token,{subject: sub,expiresIn: auth.expires_in_refresh_token});
    const refresh_token_expires_date = this.dayjsDateProvider.addDays(auth.expires_refresh_token_days)
    await this.userTokensRepository.create({
      expires_date:refresh_token_expires_date,
      refresh_token,
      user_id
    });

    const newToken = sign({},auth.secret_token,{
      subject:user_id,
      expiresIn:auth.expires_in_token
    })
    return {token:newToken,refresh_token};



  }
}
export { RefreshTokenUseCase }