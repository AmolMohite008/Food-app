import express from "express"
import {protect} from "../Controllers/UserController.js"
import { deliveryState, getAllOrders, getMyOrder, placeOrder } from "../Controllers/orderController.js"

const router = express.Router();

router.post("/place" ,protect,placeOrder) 
router.get("/myorder" ,protect,  getMyOrder)
router.get("/allorderdata" ,getAllOrders) // admin panel ke liye protect nahi lagaya abi tak role set nahi kiya
router.post("/status" ,deliveryState)// admin panel ke liye protect nahi lagaya abi tak role set nahi kiya


export default router


