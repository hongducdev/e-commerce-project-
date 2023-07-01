import React, {memo} from 'react';

const Select = ({label, options = [], defaultValue, register, errors, id, validate, style, fullWidth}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        {...register(id, validate)}
        defaultValue={defaultValue}
        className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${style} ${fullWidth ? "w-full" : ""}`}
      >
        <option value="">--Choose your option--</option>
        {
          options?.map((option, index) => (
            <option
              key={index}
              value={option.code}
              className="text-gray-900"
            >
              {option.value}
            </option>
          ))
        }
      </select>
      {errors[id] && <span className="text-red-500 text-sm">{errors[id].message}</span>}
    </div>
  );
};

export default memo(Select);
