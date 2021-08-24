import {inject,injectable} from "tsyringe"
import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import{hash} from "bcryptjs";
import { AppError } from "../../../../shared/errors/AppError";
@injectable()
class CreateUserUseCase {
  constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {

  }

  async execute({ name, password, driver_license, email }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password,8);
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if(userAlreadyExists){
      throw new AppError("User already exists",400);
      
    }
    

    await this.usersRepository.create({ name, password:passwordHash, driver_license, email });
  }
}

export { CreateUserUseCase };