import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

const Additempage = () => {
  const [image, setimage] = useState(null);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("salad");
  const [price, setprice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);

    console.log(formData);

    try {
      const response = await axios.post("https://food-app-backend-2wqb.onrender.com/api/food",formData, { withCredentials: true });

      //add notification
      toast.success(response.data.message);
      console.log(response.data);
      // to empty all filds
      setname("");
      setprice("");
      setcategory("");
      setdescription("");
      setimage("");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        {/* Upload Image */}
        <div>
          <p>Upload Image</p>
          <label className="cursor-pointer" htmlFor="image">
            <img
              className="w-[25%]"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
            />
          </label>
          <input
            onChange={(e) => setimage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-gray-600 mb-2">Product name</label>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            placeholder="Type here"
            className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-gray-600 mb-2">
            Product description
          </label>
          <textarea
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            rows="4"
            placeholder="Write content here"
            className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Category + Price */}
        <div className="flex gap-6">
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">Product category</label>
            <select
              value={category}
              onChange={(e) => setcategory(e.target.value)}
              className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Category</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          {/* Price */}
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">Product Price</label>
            <input
              value={price}
              onChange={(e) => setprice(e.target.value)}
              type="number"
              placeholder="0"
              className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white px-8 py-2 rounded-md hover:bg-gray-800 transition"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Additempage;
