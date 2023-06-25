import React from 'react'
import usePagination from "../hooks/usePagination";
import {PagiItem} from "./index";

const Pagination = ({totalCount}) => {
  const pagination = usePagination(66, 2)
  return (
    <div className="flex items-center gap-2">
      {
        pagination.map((item) => (
          <PagiItem key={item}>
            {item}
          </PagiItem>
        ))
      }
    </div>
  )
}

export default Pagination