import { memo, useState } from "react";
import { productInfoTabs } from "../ultils/contants";
import Votebar from "./Votebar";
import { renderStartFromNumber } from "../ultils/functions";

const ProductInformation = ({ totalRating, totalCount }) => {
  const activeClass =
    "uppercase text-lg bg-white px-4 rounded-t-md py-2 border-t border-l border-r border-gray-300 hover:bg-white cursor-pointer";
  const notActiveClass =
    "uppercase text-lg bg-gray-200 px-4 rounded-t-md py-2 border border-gray-300 hover:bg-white cursor-pointer";

  const [activeTab, setActiveTab] = useState(0);

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
      <div className="w-full h-[300px] border rounded-b-md rounded-tr-md border-gray-300 p-5">
        {productInfoTabs.map((tab) => (
          <p key={tab.id}>{activeTab === tab.id && tab.content}</p>
        ))}
        {activeTab === 4 && (
          <div className="flex border border-gray-300 rounded-md p-4 items-center">
            <div className="flex-4 flex items-center justify-center flex-col">
              <span className="text-2xl font-semibold">{totalRating}/5</span>
              <span className="flex items-center gap-1">{renderStartFromNumber(totalRating)}</span>
              <span className="">
								{totalCount} ratings and reviewers
							</span>
            </div>
            <div className="flex-6 flex flex-col-reverse gap-2">
              {Array.from(Array(5).keys()).map((item) => (
                <Votebar
                  key={item}
                  number={item + 1}
                  ratingTotal={5}
                  ratingCount={2}
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
