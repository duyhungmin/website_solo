import express from "express"

import { checkAuth } from "../middlewares/middlewares.checkAuth"

import {createOder , getOderDetails} from "../controllers/controller.checkOutCart"

const router = express.Router()

router.use(checkAuth)

router.post("/",createOder)
router.get('/orders/:id',getOderDetails)

export default router