import React from "react";
import { Banner, Sidebar } from "../../components";

const Home = () => {
  return (
    <div className="w-main flex">
      <div className="flex flex-col gap-5 w-[30%] flex-auto">
        <Sidebar />
        <span className="">deal</span>
      </div>
      <div className="flex flex-col gap-5 pl-5 w-[70%] flex-auto">
        <Banner />
        <span className="">best seller</span>
      </div>
    </div>
  );
};

export default Home;
