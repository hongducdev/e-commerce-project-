import React, { memo, useEffect, useState } from "react";
import icons from "../ultils/icons";
import { colors } from "../ultils/contants";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";

const { MdOutlineKeyboardArrowDown } = icons;

const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const naviagte = useNavigate();
  const {category} = useParams();
  const [selected, setSelected] = useState([]);

  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl) {
      setSelected(selected.filter((el) => el !== e.target.value));
    } else {
      setSelected((prev) => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    naviagte({
      pathName: category,
      search: createSearchParams({
        color: selected.map((color) => color.toLowerCase()),
      }).toString()
    })
  }, [selected]);

  return (
    <div
      className="p-4 text-xs text-gray-500 border border-gray-700 relative flex items-center gap-6 rounded-md capitalize select-none"
      onClick={() => changeActiveFilter(name)}
    >
      <span>{name}</span>
      <MdOutlineKeyboardArrowDown size={18} />
      {activeClick === name && (
        <div className="absolute top-full mt-1 left-0 w-fit bg-white border border-gray-300 z-50 rounded-md min-w-[200px]">
          {type === "checkbox" ? (
            <div className="">
              <div className="flex items-center justify-between border-b border-gray-300 py-6 px-5 text-sm">
                <span className="">{selected.length} selected</span>
                <span
                  className="underline cursor-pointer text-gray-700"
                  onClick={() => setSelected([])}
                >
                  Reset
                </span>
              </div>
              <div className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="text-sm font-medium flex items-center gap-2 py-2"
                  >
                    <input
                      type="checkbox"
                      name={color}
                      id={color}
                      value={color}
                      className="w-4 h-4 border border-gray-300 rounded-sm"
                      onChange={handleSelect}
                      checked={selected.includes(color)} // Use includes method to check if the color is in the selected array
                    />
                    <label htmlFor={color} className="flex-1 cursor-pointer">
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className=""></div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
