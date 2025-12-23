import express from "express"

import { checkAuth } from "../middlewares/middlewares.checkAuth"
import { getCart, addToCart,updateCart,deleteFromCart, updateQuantity } from "../controllers/controller.cart"

const router = express.Router()

router.use(checkAuth)
router.get("/",getCart)
router.post("/add",addToCart)
router.put("/update",updateCart)
router.delete("/remove/:productId",deleteFromCart)
router.patch("/update-quantity",updateQuantity)
export default router