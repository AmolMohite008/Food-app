import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { assets } from '../assets/assets';

const Orders = () => {

  const [orders, setorders] = useState([])

  const getdata = async () =>{

    const response = await axios.get("https://food-app-backend-2wqb.onrender.com/api/order/allorderdata" ,{withCredentials:true})

    if(response.data.success){
      setorders(response.data.data)
    }else{
      toast.error("err")
    }
  }

  useEffect(() => {
    getdata();
  }, [])

{/*
   const  handleStatusChange = async (orderId ,status) =>{

  const response = await axios.post("http://localhost:3000/api/order/status" , {  orderId: orderId, status: status  } ,{withCredentials:true})

   getdata(); // refresh orders
}
*/}// version given from chat gpt below

const handleStatusChange = async (orderId, status) => {

  try {

    const response = await axios.post( "https://food-app-backend-2wqb.onrender.com/api/order/status",  { orderId: orderId,  status: status}, { withCredentials: true } );

    if(response.data.success){
      toast.success("Status Updated")
      getdata()
    }

  } catch (error) {
    //console.log(error)
    toast.error("Status update failed")
  }

}


  
  //console.log(orders)
return (
  <div className="p-4 md:p-8">
    <h2 className="text-xl md:text-2xl font-bold mb-6">Order Page</h2>

    {orders.map((order) => (
      <div
        key={order._id}
        className="flex flex-col md:flex-row md:items-center md:justify-between 
                   border border-gray-300 rounded-lg 
                   p-4 md:p-6 mb-5 bg-white gap-4"
      >
        {/* Icon */}
        <div className="flex justify-center md:justify-start">
          <img
            src={assets.parcel_icon}
            alt="parcel"
            className="w-12 h-12"
          />
        </div>

        {/* Order Details */}
        <div className="flex-1 text-sm md:text-base">
          <div className="text-gray-700 flex gap-3 flex-col flex-wrap md:flex-row">
            {order.items
              .map((item ,index) => (<div key={index}>{item.name} X {item.quantity} ,</div>) )
              }
          </div>

          <p className="font-bold mt-1">
            {order.address.firstName} {order.address.lastName}
          </p>

          <p className="font-medium text-gray-600">
            {order.address.street}, {order.address.city}, {order.address.state}
          </p>

          <p className="font-medium text-gray-600">
            {order.address.phone}
          </p>
        </div>

        {/* Items + Amount */}
        <div className="text-center md:text-left">
          <p className="font-semibold">
            Items: {order.items.length}
          </p>
          <p className="font-bold text-green-600">
            ₹  {order.amount}
          </p>
        </div>

        {/* Status Dropdown */}
        <div className="w-full md:w-auto">
          <select value={order.status}  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="w-full md:w-auto border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2    focus:ring-orange-400"  >
            <option>Food Processing</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>
    ))}
  </div>
)
}

export default Orders
