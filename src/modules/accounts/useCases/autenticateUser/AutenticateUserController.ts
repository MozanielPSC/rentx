import { Request, Response } from "express";
import { container } from "tsyringe";
import { AutenticateUserUseCase } from "./AutenticateUserUseCase";


class AutenticateUserController {
  async handle(request: Request, response: Response):Promise<Response> {
    const { password, email } = request.body;
    const autenticateUserUseCase = container.resolve(AutenticateUserUseCase);
    const token = await autenticateUserUseCase.execute({ password, email });

    return response.json(token);

  }
}

export { AutenticateUserController };