import { Router } from "express";
import { autenticateRoutes } from "./autenticate.routes";
import { carRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { rentalRoutes } from "./rentals.routes";
import { passwordRoutes } from "./password.routes";


const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", usersRoutes);
router.use("/cars",carRoutes);
router.use("/rentals",rentalRoutes);
router.use("/password",passwordRoutes);
router.use(autenticateRoutes);
export { router };