import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="w-[100%]  pl-2 bg-white">
      <div className="flex flex-col gap-3 pt-6">

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-2 py-3 border border-r-0 rounded-l-md cursor-pointer ${
              isActive ? "bg-orange-100 border-l-4 border-orange-500 text-orange-600" : "hover:bg-gray-100"
            }`
          }
        >
          <img src={assets.add_icon} />
          <p className="hidden sm:block text-sm sm:text-base">Add items</p>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-2 py-3 border border-r-0 rounded-l-md cursor-pointer ${
              isActive ? "bg-orange-100 border-l-4 border-orange-500 text-orange-600" : "hover:bg-gray-100"
            }`
          }
        >
          <img src={assets.order_icon} />
          <p className="hidden sm:block text-sm sm:text-base">List items</p>
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex items-center gap-3 px-2 py-3 border border-r-0 rounded-l-md cursor-pointer ${
              isActive ? "bg-orange-100 border-l-4 border-orange-500 text-orange-600" : "hover:bg-gray-100"
            }`
          }
        >
          <img src={assets.order_icon} />
          <p className="hidden sm:block text-sm sm:text-base">Orders</p>
        </NavLink>

      </div>
    </div>
  );
};

export default LeftSideBar;
