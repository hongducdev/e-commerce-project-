import React, {memo, useEffect, useState} from "react";
import * as apis from "../../apis";
import CustomSlider from "../Common/CustomSlider";
import {useDispatch, useSelector} from "react-redux";
import {getNewProducts} from "../../store/products/asyncActions";

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

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewProducts());
  }, [dispatch]);
  const { newProducts } = useSelector((state) => state.products);

  const fetchProducts = async () => {
    const response = await apis.getProducts({
      sort: "-sold",
    });

    if (response.success) {
      setBestSeller(response?.productData);
      setNewProduct(newProducts);
      setProducts(response[0]?.productData);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch, newProducts]);

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
        <CustomSlider products={products} activeTab={activeTab} />
      </div>
    </div>
  );
};

export default memo(BestSeller);
