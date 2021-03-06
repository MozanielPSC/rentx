import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "../../../../modules/cars/useCases/listCars/ListCarsController";
import { UploadCarsImageController } from "../../../../modules/cars/useCases/uploadCarImage/UploadCarsImageController";
import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAutenticated } from "../middleware/ensureAuthenticated";

const upload = multer(uploadConfig.upload("./tmp/cars"));
const carRoutes = Router();
let createCarController = new CreateCarController();
let listCarController = new ListCarsController();
let createCarSpecificationController = new CreateCarSpecificationController();
let uploadCarsImageController = new UploadCarsImageController();
carRoutes.post("/", ensureAutenticated, ensureAdmin, createCarController.handle);
carRoutes.get("/available", listCarController.handle);
carRoutes.post("specifications/:id", ensureAutenticated, ensureAdmin, createCarSpecificationController.handle);
carRoutes.post("/images/:id", ensureAutenticated, ensureAdmin,upload.array("images"), uploadCarsImageController.handle);
export { carRoutes };