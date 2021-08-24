import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AutenticateUserUseCase } from "./AutenticateUserUseCase";
let autenticateUserUseCase: AutenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe("Autenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    autenticateUserUseCase = new AutenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

  })
  it("Should be able to autenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "1234",
      name: "Um nome",
      password: "1234",
      email: "email"
    };
    await createUserUseCase.execute(user);
    const result =  await autenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");

  })

  it("Should not be able to autenticate an user with an incorrect password", async () => {
    

    expect(async()=>{
      const user: ICreateUserDTO = {
        driver_license: "1234",
        name: "Um nome",
        password: "1234",
        email: "email"
      };
      await createUserUseCase.execute(user);
      const result =  await autenticateUserUseCase.execute({
        email: user.email,
        password: user.password
      });
      await autenticateUserUseCase.execute({
        email:"email",
        password:"vish"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to autenticate a non existing user", async () => {
    

    expect( async()=>{
      await autenticateUserUseCase.execute({
        email: "Salve",
        password:"Salvado"
      });
    }).rejects.toBeInstanceOf(AppError);

  })
});