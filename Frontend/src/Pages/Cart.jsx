import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { food_list, removecart, cartitem, setcartitem, getcartsubtotal } =  useContext(StoreContext);

  console.log(cartitem);

  return (
    <div className="max-w-6xl mx-auto px-4 my-16  text-gray-700 ">
      <div className="flex items-center justify-between text-gray-700 font-semibold pb-4 border-b">
        <p className="w-[80px]">Items</p>
        <p className="flex-1 ml-3">Title</p>
        <p className="w-[100px] text-center">Price</p>
        <p className="w-[100px] text-center">Quantity</p>
        <p className="w-[100px] text-center">Total</p>
        <p className="w-[60px] text-center">Remove</p>
      </div>

      <div className="flex flex-col ">
        {food_list.map((items) => {
          if (cartitem[items._id] > 0) {
            return (
              <div
                key={items._id}
                className="flex border-b border-gray-400 items-center py-4 text-black"
              >
                <div className="w-[80px]">
                  <img className="w-[60px] rounded" src={"http://localhost:3000/uploads/" +items.image} alt="" />
                </div>
                <p className="flex-1 font-medium ml-3">{items.name}</p>
                <p className="w-[100px] text-center">₹ {items.price}</p>
                <p className="w-[100px] text-center">{cartitem[items._id]}</p>
                <p className="w-[100px] text-center">
                  {" "}
                  ₹ {items.price * cartitem[items._id]}{" "}
                </p>
                <p
                  onClick={() => removecart(items._id)}
                  className="w-[60px] text-center cursor-pointer"
                >
                  x
                </p>
              </div>
            );
          }
        })}
      </div>
      <div className="flex justify-between gap-10 mt-20 mb-20">
        {/* LEFT : Cart Total */}
      </div>
      <div className="border-t w-full border-gray-500 pt-10 mt-20">
        <div className="flex flex-col lg:flex-row  justify-between  gap-10">
          {/* LEFT : Cart Total */}
          <div className="w-full lg:w-[45%] flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-black">Cart Totals</h1>

            <div className="flex flex-col gap-4 text-gray-700">
              <div className="flex justify-between border-b pb-2">
                <p>Subtotal</p>
                <p>₹ {getcartsubtotal()}</p>
              </div>

              <div className="flex justify-between border-b pb-2">
                <p>Delivery Fee</p>
                <p>₹ 5</p>
              </div>

              <div className="flex justify-between font-semibold text-black">
                <p>Total</p>
                <p>₹ {getcartsubtotal() === 0 ? 0 : getcartsubtotal() + 5}</p>
              </div>
            </div>

            <Link
              to="/order"
              className="w-full sm:w-fit active:scale-95 transition-all bg-orange-500 text-white px-6 py-3 rounded"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>

          {/* RIGHT : Promo Code */}
          <div className="w-full lg:w-[45%] flex flex-col gap-3">
            <h3 className="text-gray-700">
              If you have a promo code, Enter it here
            </h3>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="promo code"
                className="flex-1 border px-4 py-3 outline-none"
              />
              <button className="bg-black active:scale-95 transition-all text-white px-6 py-3">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
