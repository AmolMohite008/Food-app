import express from "express"
import {protect} from "../Controllers/UserController.js"
import { deliveryState, getAllOrders, getMyOrder, placeOrder } from "../Controllers/orderController.js"

const router = express.Router();

router.post("/place" ,protect,placeOrder) 
router.get("/myorder" ,protect,  getMyOrder)
router.get("/allorderdata" ,getAllOrders)
router.post("/status" ,deliveryState)


export default router


