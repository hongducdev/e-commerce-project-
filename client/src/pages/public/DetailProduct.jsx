import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as apis from "../../apis";
import {
  Breadcrumbs
} from "../../components";
import Slider from "react-slick";
import ReactImageMagnify from 'react-image-magnify';

var settings = {
  // dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const DetailProduct = () => {
  const {pid} = useParams();
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState('');
  const getProduct = async () => {
    const response = await apis.apiGetProduct(pid);
    console.log(response.productData);
    if (response.success) {
      setProduct(response.productData);
      setImage(response.productData.thumb);
    }
  };

  useEffect(() => {
    return () => {
      getProduct();
    };
  }, [pid]);

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 h-[81px] flex items-center justify-center">
        <div className="w-main">
          <h3 className="text-lg font-semibold">{product?.title}</h3>
          <Breadcrumbs title={product?.title} category={product?.category}/>
        </div>
      </div>
      <div className="w-main mx-auto">
        <div className="flex mt-5">
          <div className="w-2/5">
            <div>
              <div className="object-cover border border-gray-300 rounded-md">
                <ReactImageMagnify {...{
                  smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: image,
                  },
                  largeImage: {
                    src: image,
                    width: 1200,
                    height: 1200
                  }
                }} />
              </div>
              <div className="mt-5 w-full">
                <Slider {...settings}>
                  {product?.images?.map((image) => (
                    <div key={image} className="px-[5px]" onClick={
                      () => setImage(image)
                    }>
                      <img src={image} alt="thumbnail"
                           className="object-cover border border-gray-300 rounded-md"/>
                    </div>
                  ))}
                </Slider>
              </div>

            </div>
          </div>
          <div className="w-2/5">info</div>
          <div className="w-1/5">pr</div>
        </div>
      </div>
      <div className="h-[200px] w-full"></div>
    </div>
  );
};

export default DetailProduct;
