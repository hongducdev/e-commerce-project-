import React, {memo} from "react";
import Slider from "react-slick";
import Product from "../Product/Product";

var settings = {
  // dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const CustomSlider = ({ products, activeTab }) => {
  return (
    <>
      {products && (
        <Slider {...settings} className="custom-slider">
          {products?.map((product) => (
            <Product
              key={product._id}
              product={product}
              isNew={activeTab === 1 ? true : false}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

export default memo(CustomSlider);
