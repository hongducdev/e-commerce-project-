import React from "react";
import {useDispatch} from "react-redux";
import {showModal} from "../../store/app/appSlice";

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 flex items-center justify-center animate-slide-up"
      onClick={() => dispatch(showModal({
        isShowModal: false,
        modalChildren: null,
      }))}
    >
      {children}
    </div>
  );
};

export default Modal;
