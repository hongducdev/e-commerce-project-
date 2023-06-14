import React, { useEffect, useState } from "react";
import * as apis from "../apis";

import Slider from "react-slick";
import Product from "./Product";

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
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const fetchProducts = async () => {
    const response = await Promise.all([
      apis.getProducts({
        sort: "-sold",
      }),
      apis.getProducts({
        sort: "-createdAt",
      }),
    ]);

    console.log(response);

    if (response[0].success) {
      setBestSeller(response[0]?.productData);
      setNewProduct(response[1]?.productData);
      setProducts(response[0]?.productData);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeTab === 0) {
      setProducts(bestSeller);
    }
    if (activeTab === 1) {
      setProducts(newProduct);
    }
  }, [activeTab, bestSeller, newProduct]);

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
      <div className="mt-5 mx-[-10px]">
        <Slider {...settings}>
          {products?.map((product) => (
            <Product
              key={product._id}
              product={product}
              isNew={activeTab === 1 ? true : false}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSeller;
