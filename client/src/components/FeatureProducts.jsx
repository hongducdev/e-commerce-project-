import React, { memo, useEffect, useState } from "react";
import * as apis from "../apis";
import ProductCard from "./ProductCard";

const FeatureProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchFeatureProducts = async () => {
    const response = await apis.getProducts({
      limit: 9,
      totalRatings: 4,
    });
    if (response.success) {
      setProducts(response.productData);
    }
  };

  useEffect(() => {
    fetchFeatureProducts();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full border-b-2 border-primary">
        <h3 className="text-grayDark uppercase text-xl font-semibold py-4">
          featured products
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-5 my-5">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product._id}
              pid={product?._id}
              slug={product?.slug}
              title={product?.title}
              thumb={product?.thumb}
              price={product?.price}
              category={product?.category}
              totalRatings={product?.totalRatings}
            />
          ))}
      </div>
    </div>
  );
};

export default memo(FeatureProducts);
