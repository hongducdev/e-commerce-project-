import React, { memo, useEffect, useState } from "react";
import icons from "../ultils/icons";
import { colors } from "../ultils/contants";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import * as apis from "../apis";
import { formatMoney } from "../ultils/functions";
import useDebounce from "../hooks/useDebounce";
import { toast } from "react-toastify";

const { MdOutlineKeyboardArrowDown } = icons;

const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const naviagte = useNavigate();
  const { category } = useParams();
  const [selected, setSelected] = useState([]);
  const [bestPrice, setBestPrice] = useState(null);
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });

  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl) {
      setSelected(selected.filter((el) => el !== e.target.value));
    } else {
      setSelected((prev) => [...prev, e.target.value]);
    }
  };

  useEffect(() => {
    if (selected.length > 0) {
      naviagte({
        pathName: category,
        search: createSearchParams({
          color: selected.join(","),
        }).toString(),
      });
    } else {
      naviagte({
        pathName: category,
      });
    }
  }, [selected]);

  const fetchBestPrice = async () => {
    const response = await apis.getProducts({
      sort: "-price",
      limit: 1,
    });

    if (response.success) {
      setBestPrice(response.productData[0].price);
    }
  };

  useEffect(() => {
    if (type === "input") {
      fetchBestPrice();
    }
  }, [type]);

  const debouncePriceFrom = useDebounce(price.from, 500);
  const debouncePriceTo = useDebounce(price.to, 500);

  useEffect(() => {
    const data = {};

    if (Number(price.from) > 0) {
      data.from = Number(price.from);
    }
    if (Number(price.to) > 0) {
      data.to = Number(price.to);
    }

    if (price.from && price.to && Number(price.from) > Number(price.to)) {
      toast.error("Price from must be less than price to");
    }

    naviagte({
      pathName: `/${category}`,
      search: createSearchParams(data).toString(),
    });
  }, [debouncePriceFrom, debouncePriceTo, naviagte]);

  return (
    <div
      className="p-4 text-xs text-gray-500 border border-gray-700 relative flex items-center gap-6 rounded-md capitalize select-none"
      onClick={() => changeActiveFilter(name)}
    >
      <span>{name}</span>
      <MdOutlineKeyboardArrowDown size={18} />
      {activeClick === name && (
        <div className="absolute top-full mt-1 left-0 w-fit bg-white border border-gray-300 z-50 rounded-md min-w-[300px]">
          {type === "checkbox" && (
            <div className="">
              <div className="flex items-center justify-between border-b border-gray-300 py-6 px-5 text-sm">
                <span className="">{selected.length} selected</span>
                <span
                  className="underline cursor-pointer text-gray-700"
                  onClick={() => setSelected([])}
                >
                  Reset
                </span>
              </div>
              <div className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="text-sm font-medium flex items-center gap-2 py-2"
                  >
                    <input
                      type="checkbox"
                      name={color}
                      id={color}
                      value={color}
                      className="w-4 h-4 border border-gray-300 rounded-sm"
                      onChange={handleSelect}
                      checked={selected.includes(color)} // Use includes method to check if the color is in the selected array
                    />
                    <label htmlFor={color} className="flex-1 cursor-pointer">
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div className="" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-gray-300 py-6 px-5 text-sm">
                <span className="">
                  The highest price is {formatMoney(bestPrice)}
                </span>
                <span
                  className="underline cursor-pointer text-gray-700"
                  onClick={() => {
                    setPrice({
                      from: "",
                      to: "",
                    });
                  }}
                >
                  Reset
                </span>
              </div>
              <div className="py-4 px-5 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    className="bg-gray-100 outline-none p-[10px] rounded-md"
                    placeholder="From"
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    className="bg-gray-100 outline-none p-[10px] rounded-md"
                    placeholder="To"
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
