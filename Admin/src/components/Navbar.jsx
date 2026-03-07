import React from "react";
import { assets } from "../assets/assets.js";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 bg-white shadow-sm">
      
      <div>
        <img 
          className="w-[180px] " 
          src={assets.logo} 
          alt="logo"
        />
      </div>

      <div>
        <img 
          className="w-[40px] sm:w-[50px] md:w-[60px] rounded-full object-cover cursor-pointer" 
          src={assets.profile_image} 
          alt="profile"
        />
      </div>

    </div>
  );
};

export default Navbar;
