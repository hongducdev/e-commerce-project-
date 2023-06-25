import React from 'react'
import clsx from "clsx";

const PagiItem = ({children}) => {
  return (
    <div className={
      clsx('w-10 h-10 rounded-md flex justify-center', !Number(children) && 'items-end p-2', Number(children) && 'items-center cursor-pointer hover:bg-gray-200')
    }>{children}</div>
  )
}

export default PagiItem