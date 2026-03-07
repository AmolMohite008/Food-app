import { User } from "../Modules/Usermodule.js";


export const addTocart = async (req,res) =>{
    try{
    
    const userData = await User.findById(req.user._id) // protect middleware se jo check karke aya ki kon  login == req.userId jo tumane protect middleware likha hai   ,login wali id db ke user ki id se match kar kar usame cart data add ho

    if (!userData) {
  return res.status(404).json({
    success: false,
    message: "User not found"
  });
}

    const  cartData = userData.cartData || {};// Agar kisi user ka cartData empty ya undefined ho? Error de sakta hai isei liye ye format// usermodel jo cartData object hai wo  //jo login uska cartdata isme hai
    
    const { itemid } = req.body;

    if(!cartData[itemid]){
        cartData[itemid] = 1;
    }else{
        cartData[itemid] += 1;
    }

    await User.findByIdAndUpdate(req.user._id,{cartData} ,{ new: true })
    res.status(201)
    .json({
        success:true ,
        message:"added To Cart"
    })

    }catch(error){
          res.status(500).json({
      success: false,
      message: error.message
    });

    }


}


export const removeFromcart = async (req,res) =>{
    try{

    const userData = await User.findById(req.user._id);

    if(!userData){
        return res.status(400).json({message:"you are not loggedIn"})
    }

    const cartData = userData.cartData || {};

    const { itemid} = req.body;
    
if (cartData[itemid] > 1) {
      cartData[itemid] -= 1;
    } else {
      delete cartData[itemid];   // ⭐ THIS LINE IS IMPORTANT
    }

    await User.findByIdAndUpdate(req.user._id , {cartData}, {new:true})
    res.status(200).json({
        success:true,
        message:"remove From Cart"
    })


    }catch(error){
        res.status(400).json({ success:false,    message:error.message})
    }
}


export const getCartData = async (req,res) =>{
    try{

    const userData = await User.findById(req.user._id);
  
     if(!userData){
        return res.status(401).json({message:"you are not loggedIn"})
    }

    const cartData = await userData.cartData || {};

    res.status(200).json({
        success:true,
        data:cartData,
    })
    }catch(error){
        return res.status(401).json({message:error.message})
    }
}