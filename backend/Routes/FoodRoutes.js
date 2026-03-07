import express from "express";
import { addfood, getData, removedata } from "../Controllers/foodcontroller.js";
import multer from "multer";

const router = express.Router();

//1️⃣ image Storage configuration  //multer middleware  --- image stored in uploads folder
 const storage = multer.diskStorage({ 
    destination:function(req,file,cb){
        cb(null ,"uploads/") //save in uploads folder mai
    } ,
    filename:function(req,file,cb){
        cb(null, `${Date.now ()}-${file.originalname}` ) //We are joining:number + string + string -- > output ex like this 17072938394-pizza.jpg yesa dega
    }
})

const upload = multer({storage:storage})//this is middleware



router
     .route("/")
     .post( upload.single("image"), addfood)
     .get(getData)


router
  .route("/:id")
  .delete(removedata);   
   

export default router;
