import React from "react";
import { navigation } from "../ultils/contants";
import { NavLink } from "react-router-dom";

const classes = "text-sm uppercase hover:text-primary";

const Navigation = () => {
  return (
    <div className="w-main h-[50px] py-2 flex items-center gap-10">
      {navigation.map((item) => (
        <NavLink key={item.id} to={item.path} className={({isActive}) => {
          return isActive ? `${classes} text-primary` : `${classes} text-gray-600`
        }}>
          {item.value}
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;
