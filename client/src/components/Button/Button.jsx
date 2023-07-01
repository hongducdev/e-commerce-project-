import React, {memo} from "react";

const Button = ({name, type = "button", handleOnCLick, style, iconsBefore, iconsAfter, isDisable}) => {
  return (
    <button
      className={`${style} px-4 py-2 rounded-md bg-primary text-white my-2`}
      type={type}
      onClick={() => {
        handleOnCLick && !isDisable && handleOnCLick();
      }}
      disabled={isDisable}
    >
      {iconsBefore}
      <span>{name}</span>
      {iconsAfter}
    </button>
  );
};

export default memo(Button);
