import { Router } from "express";
import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategory/ListCategoryController";
import multer from "multer";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";
import { ensureAutenticated } from "../middleware/ensureAuthenticated";
import { ensureAdmin } from "../middleware/ensureAdmin";
const categoriesRoutes = Router();
const upload = multer({
  dest: "./tmp"
});
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();
categoriesRoutes.post("/",ensureAutenticated,ensureAdmin, createCategoryController.handle);
categoriesRoutes.post("/import", ensureAutenticated,ensureAdmin,upload.single("file"), importCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
export { categoriesRoutes };