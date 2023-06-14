import React, { useEffect, useState } from "react";
import * as apis from "../apis";

import Slider from "react-slick";

const tabs = [
  {
    id: 0,
    title: "Best Seller",
  },
  {
    id: 1,
    title: "New Arrivals",
  },
];

var settings = {
  // dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const fetchProducts = async () => {
    const response = await Promise.all([
      apis.getProducts({
        order: "-sold",
      }),
      apis.getProducts({
        order: "-createdAt",
      }),
    ]);

    if (response[0].success && response[1].success) {
      setBestSeller(response[0].productData);
      setNewProduct(response[1].productData);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-4 border-b-2 border-primary pb-4">
        {tabs.map((tab) => (
          <span
            className={`cursor-pointer text-xl uppercase font-semibold border-r border-gray-300 pr-4 ${
              activeTab === tab.id ? "text-grayDark" : "text-gray-500"
            }`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </span>
        ))}
      </div>
      <div className="mt-5">
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default BestSeller;
