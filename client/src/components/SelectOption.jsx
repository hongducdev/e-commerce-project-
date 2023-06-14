import React from "react";

const SelectOption = ({ icon, title }) => {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-300 text-grayDark hover:border-grayDark hover:text-white hover:bg-grayDark cursor-pointer"
      title={title}
    >
      {icon}
    </div>
  );
};

export default SelectOption;
