import React from "react";
import { assets } from "../assets/assets.js";

const Header = () => {
  return (
    <div className="w-full flex justify-center">
      <div
        className="relative rounded-md overflow-hidden
                   h-[50vh] sm:h-[60vh] lg:h-[70vh]
                   w-[95vw] lg:w-[90vw]
                   bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${assets.header_img})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div
          className="relative text-white max-w-xl
                     px-4 sm:px-8 lg:px-0
                     mb-12 sm:mb-14 
                     sm:ml-0 lg:ml-20
                     space-y-4 sm:space-y-6"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold">
            Order Your Favourite Food Here
          </h2>

          <p className="text-xs sm:text-sm opacity-90">
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise.
          </p>

          
        </div>
      </div>
    </div>
  );
};

export default Header;
