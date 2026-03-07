import { Food } from "../Modules/Foodmodules.js";
import fs from "fs";

// add food item
export const addfood = async (req, res) => {
  try {
    console.log("req.file =>", req.file);
    console.log("req.body =>", req.body);

     if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const image_filename = req.file.filename;

    const { name, price, description, category } = req.body;

    const newfood = await Food.create({
      name,
      price,
      description,
      category,
      image: image_filename,
    });

    res.status(201).json({
      success: true,
      message: "food added",
      data: newfood,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


//get Food  data
export const getData =  async (req,res) =>{

  try{
     const alldata = await Food.find()

  res.status(200).json({
    success: true,
    message:"data fetched successfully,",
    data:alldata,
  })
  }catch(error){
    res.status(400).json({
      message:error.message
    })
  }

}


//remove food data

 export const removedata = async (req,res) =>{

  try{
    const deletedata = await Food.findByIdAndDelete(req.params.id )

     if (!deletedata) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

      // delete image file from uploads folder

      if(deletedata.image){
        fs.unlink(`uploads/${deletedata.image}`, (err) => {
          if(err){ console.log("Image delete error:", err)}
        })
      }

   res.status(200).json({
    success: true, 
    message:"Food  item removed "
    
   })
  }catch (error){

    res.status(500).json({message:error.message})

  }
}
