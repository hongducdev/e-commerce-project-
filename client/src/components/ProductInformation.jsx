import { memo, useState } from "react";
import { productInfoTabs } from "../ultils/contants";
import Votebar from "./Votebar";
import { renderStartFromNumber } from "../ultils/functions";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../store/app/appSlice";
import VoteOptions from "./VoteOptions";
import * as apis from "../apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import path from "../ultils/path";
import Comment from "./Comment";

const ProductInformation = ({
  totalRating,
  ratings,
  nameProduct,
  pid,
  rerender,
}) => {
  const activeClass =
    "uppercase text-lg bg-white px-4 rounded-t-md py-2 border-t border-l border-r border-gray-300 hover:bg-white cursor-pointer";
  const notActiveClass =
    "uppercase text-lg bg-gray-200 px-4 rounded-t-md py-2 border border-gray-300 hover:bg-white cursor-pointer";

  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleSubmitVoteOption = async ({ score, comment }) => {
    if (!comment || !score || !pid) {
      toast.error("Please fill all fields");
      return;
    }
    const response = await apis.apiRating({
      star: score,
      comment: comment,
      pid,
      updatedAt: Date.now(),
    });
    if (response.success) {
      toast.success("Rating success");
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      rerender();
    }
  };

  const handleVote = async () => {
    if (isLogin) {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOptions
              nameProduct={nameProduct}
              handleSubmitVoteOption={handleSubmitVoteOption}
            />
          ),
        })
      );
    } else {
      navigate(`/${path.LOGIN}`);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-1 relative bottom-[-1px]">
        {productInfoTabs.map((tab) => (
          <span
            key={tab.id}
            className={activeTab === tab.id ? activeClass : notActiveClass}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </span>
        ))}
        <span
          className={activeTab === 4 ? activeClass : notActiveClass}
          onClick={() => setActiveTab(4)}
        >
          Customer Reviews
        </span>
      </div>
      <div className="w-full min-h-[300px] border rounded-b-md rounded-tr-md border-gray-300 p-5">
        {productInfoTabs.map((tab) => (
          <p key={tab.id}>{activeTab === tab.id && tab.content}</p>
        ))}
        {activeTab === 4 && (
          <div>
            <div className="flex items-center">
              <div className="flex-4 flex items-center justify-center flex-col ">
                <span className="text-2xl font-semibold">{totalRating}/5</span>
                <span className="flex items-center gap-1">
                  {renderStartFromNumber(totalRating)}
                </span>
                <span className="">{ratings.length} ratings and reviewers</span>
              </div>
              <div className="flex-6 flex flex-col-reverse gap-2 border-l border-gray-300 pl-10">
                {Array.from(Array(5).keys()).map((item) => (
                  <Votebar
                    key={item}
                    number={item + 1}
                    ratingTotal={ratings.length}
                    ratingCount={
                      ratings.filter((rating) => rating.star === item + 1)
                        .length
                    }
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-sm p-4 gap-2">
              <span className="">Have you rated this product?</span>
              <Button name="Write a review" handleOnCLick={handleVote} />
            </div>
            <div className="flex flex-col gap-3">
              {ratings.length > 0 &&
                ratings.map((rating) => (
                  <Comment
                    key={rating._id}
                    updatedAt={rating.updatedAt}
                    star={rating.star}
                    comment={rating.comment}
                    name={
                      rating.postedBy.firstName + " " + rating.postedBy.lastName
                    }
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductInformation);
