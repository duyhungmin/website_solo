import express from "express"; 
import {LoginUser , RegisterUser} from "../controllers/controller.user";
import {registerSchema,loginSchema} from "../validations/validations.user"
import { validateProduct } from "../middlewares/middlewares.product";
const router = express.Router();

router.post("/register",validateProduct(registerSchema),RegisterUser);
router.post("/login",validateProduct(loginSchema),LoginUser);

export default router;