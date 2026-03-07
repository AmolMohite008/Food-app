import mongoose from "mongoose";


const foodschema = new mongoose.Schema({

    name:{type:String ,required :true},
    price:{type:Number , required:true},
    description:{type:String ,requiredZ:true},
    category:{type:String ,required:true ,
        enum: ["Salad", "Rolls", "Desserts","Sandwich","Cake","Pure Veg","Pasta","Noodles"]
     },
    image:{type:String , required:true},

})

export const Food = mongoose.model("Food" ,foodschema)