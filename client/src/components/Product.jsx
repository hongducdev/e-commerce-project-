import React from "react";
import { formatMoney, renderStartFromNumber } from "../ultils/functions";
import SelectOption from "./SelectOption";
import icons from "../ultils/icons";

const { FaRegEye, FaShoppingCart, AiFillHeart } = icons;

const Product = ({ product, isNew }) => {
  return (
    <div className="w-full px-[10px] relative group cursor-pointer">
      <div className="border border-gray-300 p-5 rounded-md">
        {isNew ? (
          <div className="bg-primary top-0 right-[10px] absolute text-white px-4 py-2 rounded-tr-md rounded-bl-md uppercase text-xs z-10">
            New
          </div>
        ) : (
          <div className="bg-secondary top-0 right-[10px] absolute text-white px-4 py-2 rounded-tr-md rounded-bl-md uppercase text-xs z-10">
            Trending
          </div>
        )}
        <div className="relative">
          <img
            src={
              product?.thumb ||
              "https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
            }
            alt="image_product"
            className="w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 hidden group-hover:flex justify-center gap-3 animate-slide-up transition-all">
            <SelectOption icon={<AiFillHeart />} title="Add to Wishlist" />
            <SelectOption icon={<FaShoppingCart />} title="Buy Now"/>
            <SelectOption icon={<FaRegEye />} title="Quick view" />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <span className="capitalize line-clamp-1 hover:text-primary">
            {product?.title}
          </span>
          <span className="flex">
            {renderStartFromNumber(+product?.totalRatings)}
          </span>
          <span className="">{formatMoney(product?.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
