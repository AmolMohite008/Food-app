import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Listitem = () => {
  const [food, setfood] = useState([]);

  // getData ko component ke top-level me define karo
  const getData = async () => {
    try {
      const response = await axios.get("https://food-app-backend-2wqb.onrender.com/api/food" , { withCredentials: true });
      setfood(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFood = async (foodid) => {
    const response = await axios.delete( `https://food-app-backend-2wqb.onrender.com/api/food/${foodid}`, { withCredentials: true });
    // delete ke baad data refresh karo
    await getData();

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("error");
    }
  };

  useEffect(() => {
    getData(); // initial data fetch
  }, []);

  return (
    <div className="h-full p-4 flex flex-col w-full">
      {/* 🔹 Sticky Top Section */}
      <div className="sticky top-0 bg-white z-10">
        <h1 className="text-xl sm:text-2xl font-semibold p-4 ">
          All Foods List
        </h1>
        <div className="hidden sm:flex border rounded-sm bg-gray-100 p-4 font-semibold text-gray-700 border-b">
          <div className="w-[20%]">Image</div>
          <div className="w-[25%]">Name</div>
          <div className="w-[20%]">Category</div>
          <div className="w-[20%]">Price</div>
          <div className="w-[15%] text-center">Action</div>
        </div>
      </div>

      {/* 🔹 Scrollable Data Section */}
      <div className="flex-1 border rounded-sm overflow-y-auto hide-scrollbar">
        {food.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-around sm:flex-row p-4 border-b hover:bg-gray-50 transition"
            >
              {/* Image */}
              <div className="sm:w-[20%]">
                <img
                  src={`https://food-app-backend-2wqb.onrender.com/uploads/${item.image}`}
                  alt=""
                  className="w-16 h-16 object-cover rounded"
                />
              </div>

              {/* Name */}
              <div className="sm:w-[25%] font-medium">{item.name}</div>

              {/* Category */}
              <div className="sm:w-[20%] text-gray-600">{item.category}</div>

              {/* Price */}
              <div className="sm:w-[20%] font-medium"> ₹ {item.price}</div>

              {/* Action */}
              <div
                onClick={() => removeFood(item._id)}
                className="sm:w-[15%] text-red-500 font-bold cursor-pointer text-center"
              >
                X
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Listitem;
