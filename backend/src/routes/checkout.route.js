import express from "express"

import { checkAuth ,checkPermission} from "../middlewares/middlewares.checkAuth"

import {createOder , getOderDetails , updateOrderStatus, getAllOrder,getAllOrderByAdmin , mockPayment} from "../controllers/controller.checkOutCart"

const router = express.Router()

router.get(`/admin/orders`,checkAuth,checkPermission("admin"),getAllOrderByAdmin)

router.get('/orders/list/client',checkAuth,getAllOrder)

router.post("/",checkAuth,createOder)
router.post("/payment/success",checkAuth,mockPayment)

router.patch('/orders/:id/status',checkAuth,checkPermission("admin"),updateOrderStatus)

router.get('/orders/:id',checkAuth,getOderDetails)






export default router