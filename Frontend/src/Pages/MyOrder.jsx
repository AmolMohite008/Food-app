import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";

const MyOrder = () => {
  const [ordersData, setordersData] = useState([]);

  const getorderData = async () => {
    const response = await axios.get( "http://localhost:3000/api/order/myorder",{ withCredentials: true } );

    setordersData(response.data.data);
  };

  useEffect(() => {
    getorderData();
  }, []);

  console.log(ordersData)

  return (
    <div className="px-4 sm:px-8 md:px-16 py-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
        My Orders
      </h2>

      {ordersData.map((order) => (
        <div
          key={order._id}
          className="flex  flex-col gap-4 md:flex-row md:items-center md:justify-around border rounded-lg p-4 mb-4 bg-white shadow-sm"
        >
          {/* Left Section */}
          <div className="flex items-start sm:items-center gap-4 w-full md:w-[40%]">
            <img
              src={assets.parcel_icon}
              alt="parcel"
              className="w-10 sm:w-12 flex-shrink-0"
            />

            <div className="text-sm text-gray-600 flex flex-wrap gap-x-5 gap-y-1">
              {order.items.map((item, index) => (
                <span
                  key={index}
                  className="whitespace-nowrap"
                >
                  {item.name} x
                  <span className="font-bold ml-1">
                    {item.quantity}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div className="text-sm flex items-center font-medium   sm:text-center">
            ₹ {order.amount}
          </div>

          {/* Item Count */}
          <div className="text-sm w-full md:w-[15%] text-left md:text-center">
            Items: {order.items.length}
          </div>

          {/* Status */}
          <div className="text-sm text-orange-500 font-medium w-full md:w-[20%] text-left md:text-center">
            ● {order.status}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrder;