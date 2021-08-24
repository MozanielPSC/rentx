import { request, response, Router } from "express";
import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAutenticated } from "../middleware/ensureAuthenticated";
const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();
specificationRoutes.post("/", ensureAutenticated, ensureAdmin, createSpecificationController.handle);
export { specificationRoutes };