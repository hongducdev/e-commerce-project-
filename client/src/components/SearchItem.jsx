import React, { memo } from "react";
import icons from "../ultils/icons"

const {
  MdOutlineKeyboardArrowDown
} = icons

const SearchItem = ({ name, activeClick, changeActiveFilter }) => {
  return (
    <div className="p-4 text-xs text-gray-500 border border-gray-700 relative flex items-center gap-6 rounded-md capitalize"
      onClick={() => changeActiveFilter(name)}
    >
      <span>{name}</span>
      <MdOutlineKeyboardArrowDown size={18} />
      {activeClick === name && (
        <div className="absolute top-full mt-1 left-0 w-fit p-4 bg-white border border-gray-300 z-50 rounded-md">
          content
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
