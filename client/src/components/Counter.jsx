import React, { memo } from "react";

const Counter = ({ number, unit }) => {
  return (
    <div className="bg-gray-100 rounded-md p-2 flex items-center justify-center flex-col">
      <span className="font-semibold text-lg">{number}</span>
      <span className="text-xs text-gray-400">{unit}</span>
    </div>
  );
};

export default memo(Counter);
