import React, { memo } from "react";
import { Link } from "react-router-dom";
import path from "../ultils/path";
import icons from "../ultils/icons";

const { FaFacebookF, FaInstagram, FaTwitter, FaGoogle } = icons;

const SocialLinks = [
  {
    name: "facebook",
    link: "https://www.facebook.com/hongduccodedao",
    icon: <FaFacebookF />,
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/hongduccodedao",
    icon: <FaInstagram />,
  },
  {
    name: "twitter",
    link: "https://twitter.com/hongduccodedao",
    icon: <FaTwitter />,
  },
  {
    name: "google",
    link: "https://google.com",
    icon: <FaGoogle />,
  },
];

const TopHeader = () => {
  return (
    <div className="h-[38px] w-full bg-primary text-white text-xs flex items-center justify-center">
      <div className="w-main flex items-center justify-between">
        <span className="uppercase">
          ORDER ONLINE OR CALL US (+84) 916 157 704
        </span>
        <div className="flex items-center">
          <Link
            to={`/${path.LOGIN}`}
            className="hover:text-grayDark pr-2 border-r border-white"
          >
            Sign In or Create Account
          </Link>
          {SocialLinks.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="hover:text-grayDark text-sm px-2 border-r border-white"
              title={item.name}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(TopHeader);
