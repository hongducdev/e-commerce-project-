import React from "react";
import { NavLink } from "react-router-dom";
import { formatString } from "../ultils/functions";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const classes =
    "text-sm hover:text-white hover:bg-primary py-3 px-5 rounded-md";
  const { categories } = useSelector((state) => state.app);

  return (
    <div className="flex flex-col border border-gray-300 rounded-md">
      {categories.map((category) => (
        <NavLink
          key={category._id}
          to={formatString(category.title)}
          className={({ isActive }) => {
            return isActive
              ? `${classes} text-white bg-primary`
              : `${classes} text-gray-500`;
          }}
        >
          {category.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
