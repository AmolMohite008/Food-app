import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
//import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Placeorder = ({setshowlogin}) => {
  const { food_list, getcartsubtotal, cartitem, setcartitem ,url, loggedInUser, setLoggedInUser } = useContext(StoreContext);

  const [address, setaddress] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  //console.log(address);

  const submitHandler = async (e) => {
    e.preventDefault();

    //  Convert cartitem object → structured items array
    const orderItems = [];

    food_list.map((item) => {
      if (cartitem[item._id] > 0) {
        orderItems.push({
          itemid: item._id,
           name: item.name,
          quantity: cartitem[item._id],
        });
      }
    });

    // ek object banaya backend ko bhejne ke liye
    const orderData = { address: address, items: orderItems, amount: getcartsubtotal() + 5,};
   

   // If user not logged in → show login popup
  if (!loggedInUser) {
    setshowlogin(true);
    return;
  }

    //Api call 
   const response = await axios.post(url + "/api/order/place", orderData, { withCredentials: true });

    //add notification
    toast.success(response.data.message);
    //console.log(response.data);

    setcartitem({}); // order succffull hone par cart khali ho

    // complete hone pr sab input field khali ho
    setaddress({
      firstName: "",
      lastName: "",
      emailAddress: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
    });

    //console.log(orderData);
    // console.log(orderItems); ab cartitem is format dega [ { itemid: "...", quantity:"..." }]
  };

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className=" mx-auto max-w-[90%] flex flex-col lg:flex-row gap-12 px-6 py-10"
      >
        {/* LEFT : Delivery Information */}
        <div className="flex flex-col gap-4 w-full lg:w-[55%]">
          <h1 className="text-2xl font-semibold text-black mb-2">
            Delivery Information
          </h1>

          <div className="flex gap-4">
            <input
              required
              value={address.firstName}
              onChange={(e) =>
                setaddress({ ...address, firstName: e.target.value })
              }
              type="text"
              placeholder="First name"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md outline-none"
            />
            <input
              required
              value={address.lastName}
              onChange={(e) =>
                setaddress({ ...address, lastName: e.target.value })
              }
              type="text"
              placeholder="Last name"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md outline-none"
            />
          </div>

          <input
            required
            value={address.emailAddress}
            onChange={(e) =>
              setaddress({ ...address, emailAddress: e.target.value })
            }
            type="email"
            placeholder="Email address"
            className="px-4 py-2 border border-gray-300 rounded-md outline-none"
          />

          <input
            required
            value={address.street}
            onChange={(e) => setaddress({ ...address, street: e.target.value })}
            type="text"
            placeholder="Street"
            className="px-4 py-2 border border-gray-300 rounded-md outline-none"
          />

          <div className="flex gap-4">
            <input
              required
              value={address.city}
              onChange={(e) => setaddress({ ...address, city: e.target.value })}
              type="text"
              placeholder="City"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md outline-none"
            />
            <input
              required
              value={address.state}
              onChange={(e) =>
                setaddress({ ...address, state: e.target.value })
              }
              type="text"
              placeholder="State"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md outline-none"
            />
          </div>

          <div className="flex gap-4">
            <input
              required
              value={address.zipCode}
              onChange={(e) =>
                setaddress({ ...address, zipCode: e.target.value })
              }
              type="number"
              placeholder="Zip code"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md outline-none"
            />
            <input
              required
              value={address.country}
              onChange={(e) =>
                setaddress({ ...address, country: e.target.value })
              }
              type="text"
              placeholder="Country"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md outline-none"
            />
          </div>

          <input
            required
            value={address.phone}
            onChange={(e) => setaddress({ ...address, phone: e.target.value })}
            type="number"
            placeholder="Phone"
            className="px-4 py-2 border border-gray-300 rounded-md outline-none"
          />
        </div>

        {/* RIGHT : Cart Totals */}
        <div className="w-full lg:w-[40%] pt-14  pl-2 lg:pl-10 ">
          <h1 className="text-2xl font-semibold text-black mb-6">
            Cart Totals
          </h1>

          <div className="flex flex-col gap-4 text-gray-700">
            <div className="flex justify-between border-b pb-3">
              <p>Subtotal</p>
              <p>₹ {getcartsubtotal()}</p>
            </div>

            <div className="flex justify-between border-b pb-3">
              <p>Delivery Fee</p>
              <p>₹ 5</p>
            </div>

            <div className="flex justify-between font-semibold text-black">
              <p>Total</p>
              <p>₹ {getcartsubtotal() === 0 ? 0 : getcartsubtotal() + 5}</p>
            </div>
          </div>

          <button
            type="submit"
            className="inline-block mt-6 bg-orange-500 text-white px-8 py-3 rounded active:scale-95 transition-all"
          >
           Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Placeorder;
