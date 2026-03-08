import dotenv from "dotenv";//for read  .env file  Node.js khud se .env file nahi padhta.
dotenv.config();//read  karne ka kaam dotenv.config() karta hai. aur Uske andar ke values uthata hai process.env ke andar daal deta hai  jo hamne authenication me use kiya hai

import express from "express";
import cookieParser from "cookie-parser";
import cors from'cors'
import connectDb from "./ConfigDb/db.js";
import FoodRoutes from './Routes/FoodRoutes.js'
import UserRoute from './Routes/UserRoute.js'
import cartRoutes from "./Routes/cartRoutes.js"
import orderRoutes from "./Routes/orderRoutes.js"
import { protect } from "./Controllers/UserController.js";


 const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
  origin:[ "http://localhost:5173", "http://localhost:5174" ,"https://cravecart-js98.onrender.com" ,"https://cravecart-admin-ylp5.onrender.com"] ,// Your frontend URL admin and user bote can be use backeand at same time 
  credentials: true  // IMPORTANT: Allow cookies to be sent/received
}));

//  Cookie Parser - Required to read/set cookies
app.use(cookieParser());

//db connection
connectDb()

//Api  Routes
app.use("/uploads", express.static("uploads"));//Static folder serve karo Taaki frontend image dekh sake.
app.use('/api/food' ,FoodRoutes);
app.use("/api/user" , UserRoute);
app.use("/api/cart" ,cartRoutes)
app.use("/api/order" , orderRoutes)
app.get("/", (req, res) => {                 
  res.send("backend working");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

