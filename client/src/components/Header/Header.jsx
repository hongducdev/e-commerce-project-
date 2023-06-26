import React, {memo} from "react";
import {Link} from "react-router-dom";
import path from "../../ultils/path";
import icons from "../../ultils/icons";
import {useSelector} from "react-redux";

const {FaPhoneAlt, FaUserAlt, FaShoppingBag, IoMdMail} = icons;

const Header = () => {

  const {current} = useSelector(state => state.user);

  return (
    <div className="w-main h-[110px] py-[35px] flex items-center justify-between">
      <div className="">
        <Link to={path.HOME}>
          <span className="font-bold text-4xl">
            HDCD <span className="text-primary">SHOP</span>
          </span>
        </Link>
      </div>
      <div className="flex items-center h-full">
        <div className="text-center px-5 border-r border-gray-300">
          <span className="font-semibold text-sm flex items-center gap-2 text-gray-600">
            <FaPhoneAlt className="mr-[5px] text-primary"/>
            <span>(+84) 916 157 704</span>
          </span>
          <span className="text-xs text-gray-500">Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="text-center px-5 border-r border-gray-300">
          <span className="font-semibold text-sm flex items-center gap-2 text-gray-600 uppercase">
            <IoMdMail className="mr-[5px] text-primary"/>
            <span>contact.hongduc@gmail.com</span>
          </span>
          <span className="text-xs text-gray-500">Online Support 24/7</span>
        </div>
        <div className="flex items-center justify-center gap-2 px-5 border-r border-gray-300 h-full">
          <FaShoppingBag size={24} className="text-primary"/>
          <span className="">0 item</span>
        </div>
        {
          current && (
            <Link className="px-5 flex items-center gap-2 cursor-pointer"
                  to={current.role === 1001 ? `/${path.ADMIN}/${path.DASHBOARD}` : `/${path.MEMBER}/${path.PERSONAL}`}>
              <FaUserAlt size={24} className="text-primary"/>
              <span>
            Profile
          </span>
            </Link>
          )
        }
      </div>
    </div>
  );
};

export default memo(Header)
