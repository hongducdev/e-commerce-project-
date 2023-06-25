import {useMemo} from "react";
import {generateRange} from "../ultils/functions";
import icons from "../ultils/icons";

const {BiDotsHorizontalRounded} = icons
const usePagination = (
  totalProductCount,
  currentPage,
  siblingCount = 1,
) => {
  const paginationArray = useMemo(() => {
    const pageSize = process.env.REACT_APP_PRODUCT_LIMIT || 10
    const pagitionCount = Math.ceil(totalProductCount / pageSize)
    const totalPaginationItems = siblingCount + 5

    if(pagitionCount <= totalPaginationItems) {
      return generateRange(1, pagitionCount)
    }

    const isShowLeft = currentPage - siblingCount > 2
    const isShowRight = currentPage + siblingCount < pagitionCount - 1

    if(isShowLeft && !isShowRight) {
      const rightStart = pagitionCount - 4
      const rightRange = generateRange(rightStart, pagitionCount)

      return [1, <BiDotsHorizontalRounded/>, ...rightRange]
    }

    if(!isShowLeft && isShowRight) {
      const leftRange = generateRange(1, 5)
      return [...leftRange, <BiDotsHorizontalRounded/>, pagitionCount]
    }

    const siblingLeft = Math.max(currentPage - siblingCount, 1)
    const siblingRight = Math.min(currentPage + siblingCount, pagitionCount)

    if(isShowLeft && isShowRight) {
      const middleRange = generateRange(siblingLeft, siblingRight)
      return [1, <BiDotsHorizontalRounded/>, ...middleRange, 'DOTS', pagitionCount]
    }

  }, [totalProductCount, currentPage, siblingCount])

  return paginationArray
}

export default usePagination