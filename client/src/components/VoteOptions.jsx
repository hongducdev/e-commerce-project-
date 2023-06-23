import React, { memo, useEffect, useRef } from "react";
import icons from "../ultils/icons";
import { useDispatch } from "react-redux";
import { showModal } from "../store/app/appSlice";
import Button from "./Button";

const { AiOutlineClose, BsStarFill } = icons;

const VoteOptions = ({ nameProduct }) => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div
      ref={modalRef}
      className="bg-white min-w-[500px] p-8 rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between">
        <h1 className="text-3xl text-primary font-semibold mb-10 uppercase text-center">
          {nameProduct}
        </h1>
        <div className="">
          <AiOutlineClose
            className="text-2xl cursor-pointer hover:text-primary"
            onClick={() =>
              dispatch(
                showModal({
                  isShowModal: false,
                  modalChildren: null,
                })
              )
            }
          />
        </div>
      </div>
      <div className="">
        <textarea className="w-full form-textarea rounded-lg p-2" placeholder="Type something..." />
      </div>
      <div className="flex flex-col justify-center items-center mt-3">
        <span className="">How would you rate this product?</span>
        <div className="flex items-center gap-2">
          {Array.from(Array(5).keys()).map((item) => (
            <div className="" key={item}>
              <BsStarFill className="text-gray-400 text-3xl cursor-pointer hover:text-yellow-500" />
            </div>
          ))}
        </div>
      </div>
      <Button name="Submit" style="w-full mt-5" />
    </div>
  );
};

export default memo(VoteOptions);
