import { useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Placeorder from "./Pages/Placeorder";
import Footer from "./components/Footer";
import LoginPopup from "./components/LoginPopup";
import { ToastContainer, toast } from "react-toastify";
import MyOrder from "./Pages/MyOrder";
function App() {
  const [showlogin, setshowlogin] = useState(false);

  return (
    <>
      {showlogin ? <LoginPopup setshowlogin={setshowlogin} /> : <></>}
      <div className=" font-semibold text-lg">
         <ToastContainer />
        <Navbar setshowlogin={setshowlogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Placeorder />} />
          <Route path="/myorder" element ={<MyOrder />}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
