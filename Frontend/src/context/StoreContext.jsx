import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {

  const [food_list, setfood_list] = useState([])

  const [cartitem, setcartitem] = useState({});

const [loggedInUser, setLoggedInUser] = useState(null);



 const url = "https://food-app-backend-2wqb.onrender.com"; // backend link

// 🔐 Check Logged In User
 const checkuser = async () => {
  try {
  const response = await axios.get(url + "/api/user/me", { withCredentials: true });

     setLoggedInUser(response.data.data);
  } catch (error) {
     setLoggedInUser(null);
  }
};
//console.log(loggedInUser)
//fetch food data from nackend

const fetchFood = async () =>{
  try{

   const response = await axios.get(url + "/api/food", { withCredentials: true })

    setfood_list(response.data.data)
  }catch(error){
  console.log("Food fetch error:", error);
  }
}

useEffect(() => {
  checkuser();
  fetchFood()
}, []);

useEffect(() => {
   if(loggedInUser){
    getcartData();
   }else {
    setcartitem({});   // ✅ logout hote hi cart clear
  }
   //console.log("User:", loggedInUser);
}, [loggedInUser])


  const addToCart = async (itemid) => { 

   if(loggedInUser){

     await axios.post(url + "/api/cart/add", { itemid }, { withCredentials: true })
    }

    
    if (!cartitem[itemid]) {
      setcartitem((prev) => ({ ...prev, [itemid]: 1 }));
    } else {
      setcartitem((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }));
    }
  };

  const removecart = async (itemid) => {
    setcartitem((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));

     if(loggedInUser){

      await axios.post(url + "/api/cart/remove", { itemid }, { withCredentials: true })
    }
  };

  const getcartData = async () =>{

    try{
      
       if(!loggedInUser) return;//Return matlab brake laga diya condion ture ho to ruk jayega nahi to user login hai to niche vali api call hogi
        const response = await axios.get(url + "/api/cart/get", { withCredentials: true })
    if(response.data.success){
      setcartitem(response.data.data)
 }

    }catch(error){
      return console.log(error.message)
    }
  }

  const getCartItemsCount = () => {
    // cart me kitane items add kiye uska count (basket me dikhate  hai or etc.)

    return Object.values(cartitem).filter((qty) => qty > 0).length; // object.vales  object value nikalta hai “Sirf wahi items rakho jinki quantity 0 se zyada hai”
  }; 

  const getcartsubtotal = () => {                         
    let total = 0;

    food_list.forEach((item) => {
      if (cartitem[item._id] > 0) {
        total += item.price * cartitem[item._id];
      }
    });

    return total ;
  };

 // useEffect(() => {
 //  console.log(cartitem);
    //console.log(food_list);

 // }, [cartitem]); // check karne ke liye caritems konse add huye hai

  const contextValue = {
    food_list,
    addToCart,
    removecart,
    cartitem,
    setcartitem,
    getCartItemsCount,
    getcartsubtotal,
     setLoggedInUser,
     loggedInUser,
     checkuser,
     url,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
 