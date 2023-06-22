import React, { memo } from "react";

const SelectOptions = ({ value, changeValue, options }) => {

  return (
    <select
      value={value}
      onChange={(e) => changeValue(e.target.value)}
      className="form-select text-sm rounded-md"
    >
      {
        options.map((option) => (
          <option key={option.id} value={option.value}>{option.text}</option>
        ))
      }
    </select>
  );
};

export default memo(SelectOptions);
