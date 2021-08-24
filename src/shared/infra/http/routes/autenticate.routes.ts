import { Router } from "express";
import { AutenticateUserController } from "../../../../modules/accounts/useCases/autenticateUser/AutenticateUserController";
import { RefreshTokenController } from "../../../../modules/accounts/useCases/refreshToken/RefreshTokenController";
const autenticateRoutes = Router();
const autenticateUserController = new AutenticateUserController();
const refreshTokenController = new RefreshTokenController();
autenticateRoutes.post("/sessions", autenticateUserController.handle);
autenticateRoutes.post("/refresh-token",refreshTokenController.handle)

export { autenticateRoutes };