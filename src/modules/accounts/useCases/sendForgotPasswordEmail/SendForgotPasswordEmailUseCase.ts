import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";
import { v4 as uuidv4 } from "uuid";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { resolve } from "path";
@injectable()
class SendForgotPasswordEmailUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("UserTokensRepository") private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider") private dayjsDateProvider: IDateProvider,
    @inject("EtherealMailProvider") private mailprovider: IMailProvider
  ) {

  }
  async execute(email: string) {
    const templatePath = resolve(__dirname, "..", "..", "views", "emails", "password.hbs");
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("User does not exists");
    }

    const token = uuidv4();
    const expires_date = this.dayjsDateProvider.addHours(3);
    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    });
    const variables = {
      name: user.name,
      link:`${process.env.FORGOT_MAIL_URL}${token}`
    }
    await this.mailprovider.sendMail(email,"Recuperação de senha",variables,templatePath);
  }
}

export { SendForgotPasswordEmailUseCase }