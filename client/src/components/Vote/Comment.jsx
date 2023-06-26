import React, {memo} from "react";
import avatar from "../../assets/user-ava.png";
import moment from "moment";
import {renderStartFromNumber} from "../../ultils/functions";

const Comment = ({
  image = avatar,
  name = "Anonymous",
  comment,
  updatedAt,
  star,
}) => {
  return (
    <div className="flex gap-4">
      <div className="">
        <img
          src={image}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
      <div className="flex-auto flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold">{name}</span>
          <span className="font-medium text-sm">{moment(updatedAt).fromNow()}</span>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Rating:</span>
            <span className="flex items-center gap-1">{renderStartFromNumber(star)}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Comment:</span>
            <span className="">{comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
