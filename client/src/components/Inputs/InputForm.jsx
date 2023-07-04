import React, {memo} from 'react';
import clsx from "clsx";

const InputForm = ({
                     label,
                     disabled,
                     register,
                     errors,
                     id,
                     validate,
                     type = "text",
                     placeholder,
                     fullWidth,
                     defaultValue,
                     style
                   }) => {
  return (
    <div className={`flex flex-col gap-2 ${style}`}>
      {
        label && (<label htmlFor={id}>
          {label}
        </label>)
      }
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        className={clsx("border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary", {
          "w-full": fullWidth
        })}
        defaultValue={defaultValue}
      />
      {errors[id] && <p className="text-red-500 text-xs italic">{errors[id].message}</p>}
    </div>
  );
};

export default memo(InputForm);
