import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, Navigation, TopHeader } from "../../components";

const Public = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
