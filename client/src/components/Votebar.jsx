import React, { useEffect, useRef } from "react";
import icons from "../ultils/icons";

const { BsStarFill } = icons;

const Votebar = ({ number, ratingCount, ratingTotal }) => {
  const percentRef = useRef(null);

  useEffect(() => {
    const percent = (ratingCount / ratingTotal) * 100;
    percentRef.current.style.right = `${100 - percent}%`;
  }, [ratingCount, ratingTotal]);

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex items-center gap-1 text-sm flex-1">
        <span className="">{number}</span>
        <BsStarFill className="text-yellow-500" />
      </div>
      <div className="flex-8">
        <div className="w-full h-2 rounded-full bg-gray-200 relative">
          <div
            className="absolute inset-0 bg-primary rounded-full"
            ref={percentRef}
          ></div>
        </div>
      </div>
      <div className="flex-1 text-gray-500">{ratingCount} ratings</div>
    </div>
  );
};

export default Votebar;
