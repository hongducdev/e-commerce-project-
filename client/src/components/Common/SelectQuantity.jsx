import {memo} from "react";

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  const handleInputChange = (e) => {
    handleQuantity(e.target.value);
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-md">
      <span
        className="p-2 cursor-pointer text-lg border-r border-gray-600 hover:bg-grayDark rounded-l-md hover:text-white select-none"
        onClick={() => handleChangeQuantity("minus")}
      >
        -
      </span>
      <input
        type="text"
        className="py-2 outline-none bg-transparent w-[50px] text-center"
        value={quantity}
        onChange={handleInputChange} // Use onChange instead of onClick
      />
      <span
        className="p-2 cursor-pointer text-lg border-l border-gray-600 hover:bg-grayDark rounded-r-md hover:text-white select-none"
        onClick={() => handleChangeQuantity("plus")}
      >
        +
      </span>
    </div>
  );
};

export default memo(SelectQuantity);
