import React, { memo } from "react";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";

const { IoMdMail } = icons;

const Footer = () => {
  return (
    <div className="w-full">
      <div className="h-[100px] bg-primary w-full text-white flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col">
            <span className="uppercase text-xl">Sign up to newsletter</span>
            <span className="text-sm opacity-70">
              Subscribe now and receive weekly newsletter
            </span>
          </div>
          <div className="bg-white bg-opacity-20 h-[50px] rounded-full flex items-center max-w-[600px] flex-1">
            <input
              type="email"
              className="bg-transparent text-white placeholder:text-white w-full h-full px-5 outline-none"
              placeholder="Email address"
            />
            <button className="h-full px-6">
              <IoMdMail className="text-white" />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-grayDark py-[50px] flex items-center justify-center">
        <div className="w-main flex text-white text-[13px]">
          <div className="flex-2">
            <span className="uppercase text-[15px] pl-5 border-l-4 border-primary font-semibold mb-5">
              about us
            </span>
            <div className="flex flex-col gap-[10px] mt-5">
              <div className="flex items-center gap-2">
                <span className="text-white">Address:</span>
                <span className="text-gray-400">
                  Yen Bai City, Yen Bai Province, Viet Nam
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">Phone:</span>
                <span className="text-gray-400">+84 123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">Mail:</span>
                <span className="text-gray-400">contact.hongduc@gmail.com</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <span className="uppercase text-[15px] pl-5 border-l-4 border-primary font-semibold mb-5">
              information
            </span>
            <div className="mt-5 flex flex-col gap-[10px]">
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-all duration-300"
              >
                Typography
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-all duration-300"
              >
                Gallery
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-all duration-300"
              >
                Store Location
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-all duration-300"
              >
                Today's Deals
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <span className="uppercase text-[15px] pl-5 border-l-4 border-primary font-semibold mb-5">
              who we are
            </span>
            <div className="mt-5 flex flex-col gap-[10px]">
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-all duration-300"
              >
                Help
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-all duration-300"
              >
                Free Shipping
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-all duration-300"
              >
                FAQs
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-all duration-300"
              >
                Return & Exchange
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-all duration-300"
              >
                Testimonials
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <span className="uppercase text-[15px] pl-5 border-l-4 border-primary font-semibold mb-5">
              #digitalworldstore
            </span>
          </div>
        </div>
      </div>
      <div className="bg-black h-[70px] flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <span className="text-gray-400 text-xs">
            © 2023 Hong Duc. All Rights Reserved | Design by Hong Duc
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
