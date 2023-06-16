import React, { memo, useEffect, useState } from "react";
import icons from "../ultils/icons";
import * as apis from "../apis";
import { formatMoney, renderStartFromNumber } from "../ultils/functions";
import Counter from "./Counter";
import { Link } from "react-router-dom";
import path from "../ultils/path";

const { AiOutlineMenu, BsStarFill } = icons;
let interval;

const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);

  const fetchDealDaily = async () => {
    const response = await apis.getProducts({
      limit: 1,
      page: Math.round(Math.random() * 10),
      totalRatings: 5,
    });
    if (response.success) {
      setDealDaily(response.productData[0]);
      const h = 24 - new Date().getHours();
      const m = 60 - new Date().getMinutes();
      const s = 60 - new Date().getSeconds();
      setHour(h);
      setMinute(m);
      setSecond(s);
    } else {
      setHour(0);
      setMinute(0);
      setSecond(0);
    }
  };

  useEffect(() => {
    fetchDealDaily();
  }, []);

  useEffect(() => {
    clearInterval(interval);
    fetchDealDaily();
  }, [expireTime]);

  useEffect(() => {
    interval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpireTime(!expireTime);
            clearInterval(interval);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [second, minute, hour, expireTime]);

  return (
    <div className="border border-gray-300 w-full rounded-md flex-auto p-5">
      <div className="w-full flex items-center justify-between">
        <span className="flex-1">
          <BsStarFill className="text-primary " size={20} />
        </span>
        <span className="uppercase text-xl text-gray-600 font-semibold text-center">
          daily deal
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="flex flex-col mt-[50px]">
        <Link
          to={`/${path.DETAIL_PRODUCT}/${dealDaily?._id}/${dealDaily?.slug}`}
        >
          <img
            src={dealDaily?.thumb}
            alt="thumbnail"
            className="w-full object-cover cursor-pointer"
          />
        </Link>
        <div className="text-center mt-4">
          <Link
            className="hover:text-primary cursor-pointer"
            to={`/${path.DETAIL_PRODUCT}/${dealDaily?._id}/${dealDaily?.slug}`}
          >
            {dealDaily?.title}
          </Link>
          <span className="flex items-center justify-center my-3 text-xl">
            {renderStartFromNumber(dealDaily?.totalRatings)}
          </span>
          <span className="" title={formatMoney(dealDaily?.price)}>
            {formatMoney(dealDaily?.price)}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-4">
          <Counter number={hour} unit="Hours" />
          <Counter number={minute} unit="Minutes" />
          <Counter number={second} unit="Seconds" />
        </div>
        <div className="mt-4">
          <Link
            to={`/${path.DETAIL_PRODUCT}/${dealDaily?._id}/${dealDaily?.slug}`}
          >
            <button className="w-full bg-primary hover:bg-grayDark text-white flex items-center justify-center gap-2 uppercase p-3 rounded-md font-medium">
              <AiOutlineMenu /> options
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(DealDaily);
