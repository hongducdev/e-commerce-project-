import React from "react";

const Button = ({ name, handleOnCLick, style, iconsBefore, iconsAfter }) => {
  return (
    <button
      className={`${style} px-4 py-2 rounded-md bg-primary text-white my-2`}
      type="button"
      onClick={() => {
        handleOnCLick && handleOnCLick();
      }}
    >
      {iconsBefore}
      <span>{name}</span>
      {iconsAfter}
    </button>
  );
};

export default Button;
