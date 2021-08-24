import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/repositories/UsersRepository";
import { UserTokensRepository } from "../../../../modules/accounts/infra/repositories/UserTokensRepository";
import auth from "../../../../config/auth";

interface IPayLoad {
  sub: string;
}

export async function ensureAutenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayLoad;
    const usersRepository = new UsersRepository();
    request.user={
    id:user_id,
    };
    next();
  } catch (e) {
    throw new AppError("Invalid Token", 401);
  }

}