import { Order } from "../Modules/ordermodule.js";
import { User } from "../Modules/Usermodule.js";


//placing user order for fronted-

export const placeOrder = async (req, res) => {
  try {
    const { amount, address, items } = req.body; //fronted se ane  wala data
    const userid = req.user._id; //  from proteact middleware curreant userid

      //  user fetch karo
    const user = await User.findById(userid);

    const newOrder = await Order.create({ userid, amount, address, items , userName: user.name,  });

    //  Clear user cart after order
    await User.findByIdAndUpdate(userid, { cartData: {} });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyOrder = async (req, res) => {
  try {
    const userid = req.user._id;

    const orders = await Order.find({ userid })


    res.status(200).json({
      success: true,
      message: "orders featched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Orders fetched fails Something went wrong",
    });
  }
};


export const getAllOrders = async (req,res) =>{

  try{
     const alldata = await Order.find()

  res.status(200).json({
    message:"order alldata featched successfully",
    success:true ,
    data:alldata
  })

  }catch (error){

    res.status(500).json({
      success:false,
      message:error.message
    })

  }
}


export const deliveryState = async (req ,res ) =>{

  try{
    
      const { orderId, status } = req.body; 
  


  const stateData = await Order.findByIdAndUpdate(
      orderId, //order id
      { status },//update data
      { new: true } // // teturn update document
  )

  res.status(200).json({
    success:true,
    message:"state Updated",
    //data:stateData
  })

  }catch(error){

    res.status(500).json({
      success:false ,
      message:error.message ,
    })

  }
}
