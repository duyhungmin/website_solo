import express from "express";
import { createProducts , getAllProducts, getProductById, updateProductById, deleteProductById } from "../controllers/controller.product";
import { validateProduct } from "../middlewares/middlewares.product";
import { createProductSchema , updateProductSchema } from "../validations/validations.product";
import {checkAuth,checkPermission} from "../middlewares/middlewares.checkAuth"
const router = express.Router();

// check yêu cầu xác thực

// thêm sản phẩm với validate

router.get("/",getAllProducts);
router.get("/:id",getProductById);

// chỉ cho phép admin
router.use(checkAuth)
router.use(checkPermission("admin"));
router.post("/",validateProduct(createProductSchema),createProducts);
router.put("/:id",validateProduct(updateProductSchema),updateProductById);
router.delete("/:id",deleteProductById);

export default router;