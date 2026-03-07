import { useState } from "react";
import Navbar from "./components/Navbar";
import LeftSideBar from "./components/LeftSideBar";
import { Route, Routes } from "react-router-dom";
import Additem from "./pages/Additempage";
import Listitem from "./pages/Listitem";
import Order from "./pages/Orders";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="h-screen overflow-hidden flex flex-col">
        <ToastContainer />
        <Navbar />
        <hr />
        <div id="app-content" className="flex w-full h-screen overflow-hidden">
          <div id="left-side" className="w-[15vw] border-r border-black  sticky top-0">
            <LeftSideBar />
          </div>
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/add" element={<Additem />} />
              <Route path="/" element={<Listitem />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
