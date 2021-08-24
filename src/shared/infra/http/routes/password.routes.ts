import { Router } from "express";
import { ResetUserPasswordController } from "../../../../modules/accounts/useCases/resetUserPassword/ResetUserPasswordController";
import { SendForgotPasswordEmailController } from "../../../../modules/accounts/useCases/sendForgotPasswordEmail/SendForgotPasswordEmailController";
const passwordRoutes = Router();

const sendForgotEmailController = new SendForgotPasswordEmailController();
const resetPasswordController = new ResetUserPasswordController();
passwordRoutes.post("/forgot", sendForgotEmailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };