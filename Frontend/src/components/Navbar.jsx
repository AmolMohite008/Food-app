import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext.jsx";
import axios from "axios";

const Navbar = ({ setshowlogin }) => {
  const [menu, setMenu] = useState(" "); // ✅ string

  const { getCartItemsCount ,loggedInUser,setLoggedInUser ,url } = useContext(StoreContext);

  const logoutHandler = async () =>{
    try{

    const response = await axios.post(url + "/api/user/logout", {}, { withCredentials: true })

      setLoggedInUser(null)

    }catch(error){

    }
  }

  const activeClass = " border-b-2 border-[#49559e] font-semibold";

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center pr-4  mt-4 justify-between  mb-3 w-[90%] ">
        {/* Logo */}
        <div className="w-45">
          <Link to="/">
            {" "}
            <img className=" w-w  " src={assets.logo} alt="logo" />
          </Link>
        </div>

        {/* Menu */}
        <div className="hidden md:block">
          <ul className="flex items-center font-bold justify-around gap-20 cursor-pointer">
            <Link to="/">
              <li
                onClick={() => {
                  setMenu("home");
                }}
                className={`${menu === "home" ? activeClass : ""}`}
              >
                Home
              </li>
            </Link>

            <li
              onClick={() => {
                setMenu("menu");
                scrollToSection("explore");
              }}
              className={`${menu === "menu" ? activeClass : ""}`}
            >
              Menu
            </li>

            <li
              onClick={() => {
                setMenu("contact");
                scrollToSection("footer");
              }}
              className={`${menu === "contact" ? activeClass : ""}`}
            >
              Contact Us
            </li>
          </ul>
        </div>

        {/* Right Icons */}
        <div className="flex items-center justify-around gap-8">
          
          <div className=" relative cursor-pointer  ">
            {/* //0 ho to khali div aur  0 se bada hai to count*/}
            <Link to="/cart">
              {" "}
              <img src={assets.basket_icon} alt="basket" />
            </Link>
            {getCartItemsCount() === 0 ? (
              <></>
            ) : (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center  rounded-full font-bold shadow-md">
                {getCartItemsCount()}
              </span>
            )}
          </div>
       {loggedInUser ? (
  <div className="relative group flex items-center cursor-pointer">

    {/* Profile Icon */}
    <img
      src={assets.profile_icon}
      alt="profile"
      className="w-10 h-10 rounded-full"
    />
  
    {/* Dropdown */}
    <div className="absolute right-0 top-10 w-44 bg-white border border-gray-200 rounded-md shadow-xl 
    opacity-0 scale-95 invisible 
    group-hover:opacity-100 group-hover:visible group-hover:scale-100
    transition-all duration-200 origin-top-right z-50">

      <ul className="flex flex-col text-sm text-gray-700">

        <Link to="/myorder">
          <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition">
            <img src={assets.bag_icon} alt="orders" className="w-4 h-4" />
            Orders
          </li>
        </Link>
        <hr  className=" ml-4 w-[80%]" ></hr>
        <li
          onClick={logoutHandler}
          className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-500 transition"
        >
          <img src={assets.logout_icon} alt="logout" className="w-4 h-4" />
          Logout
        </li>

      </ul>
    </div>

  </div>
) : (
  <div>
    <button
      onClick={() => setshowlogin(true)}
      className="border rounded-3xl active:scale-95 p-1 pl-3 pr-3 cursor-pointer hover:bg-black hover:text-white transition-all"
    >
      Sign In
    </button>
  </div>
)}


        </div>
      </div>
    </div>
  );
};

export default Navbar;
