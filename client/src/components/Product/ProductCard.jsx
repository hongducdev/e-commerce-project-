import React, {memo} from "react";
import {Link} from "react-router-dom";
import {formatMoney, renderStartFromNumber} from "../../ultils/functions";

const ProductCard = ({ title, thumb, price, totalRatings, pid, slug, category }) => {
  return (
    <div className="w-full border border-gray-300 rounded-md p-4 flex items-center gap-5">
      <div className="w-[30%]">
        <Link to={`/${category.toLowerCase()}/${pid}/${slug}`}>
          <img src={thumb} alt="thumbnail" className="w-full" />
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <Link to={`/${category.toLowerCase()}/${pid}/${slug}`}>
          <h3 className="text-grayDark hover:text-primary text-sm font-medium capitalize line-clamp-1">
            {title}
          </h3>
        </Link>
        <span className="flex items-center text-sm">
          {renderStartFromNumber(totalRatings)}
        </span>
        <span className="text-xs text-gray-600" title={formatMoney(price)}>
          {formatMoney(price)}
        </span>
      </div>
    </div>
  );
};

export default memo(ProductCard);
