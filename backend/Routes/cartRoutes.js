import express from "express"
import { addTocart, getCartData, removeFromcart } from "../Controllers/cartController.js";
import { protect } from "../Controllers/UserController.js";


const router = express.Router();

router.post("/add" , protect, addTocart);
router.post("/remove" ,protect, removeFromcart);
router.get("/get" ,protect,  getCartData);

export default router