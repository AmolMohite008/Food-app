import React, { useState } from "react";
import Header from "../components/Header";
import ExploreMenu from "../components/ExploreMenu";
import Fooddisplay from "../components/Fooddisplay";

const Home = () => {
  const [category, setcategory] = useState("all");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setcategory={setcategory} />
      <Fooddisplay category={category} setcategory={setcategory} />
    </div>
  );
};

export default Home;
