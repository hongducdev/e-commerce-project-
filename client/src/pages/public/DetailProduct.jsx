import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import {
  Breadcrumbs,
  Button,
  CustomSlider,
  ProductExtraInfoItem,
  ProductInformation,
  SelectQuantity,
} from "../../components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { formatMoney, renderStartFromNumber } from "../../ultils/functions";
import { productExtraInfo } from "../../ultils/contants";

var settings = {
  // dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const DetailProduct = () => {
  const { pid, category, slug } = useParams();
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const getProduct = async () => {
    const response = await apis.apiGetProduct(pid);
    if (response.success) {
      setProduct(response.productData);
      setImage(response.productData.thumb);
    }
  };

  const getProducts = async () => {
    const response = await apis.getProducts({
      category: category,
    });
    if (response.success) {
      setRelatedProducts(response.productData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProduct();
      await getProducts();
    };

    fetchData();
  }, [pid, slug, category]);

  const handleQuantity = useCallback(
    (number) => {
      if (Number(number) < 1 || !Number(number)) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity]
  );

  const handleChangeQuantity = useCallback(
    (type) => {
      if (type === "minus" && quantity === 1) {
        return;
      }
      if (type === "plus") {
        setQuantity((prev) => +prev + 1);
      }
      if (type === "minus") {
        setQuantity((prev) => +prev - 1);
      }
    },
    [quantity]
  );

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 h-[81px] flex items-center justify-center">
        <div className="w-main">
          <h3 className="text-lg font-semibold">{product?.title}</h3>
          <Breadcrumbs title={product?.title} category={product?.category} />
        </div>
      </div>
      <div className="w-main mx-auto">
        <div className="flex mt-5 gap-10">
          <div className="w-2/5">
            <div>
              <div className="object-cover border border-gray-300 rounded-md">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: image,
                    },
                    largeImage: {
                      src: image,
                      width: 1200,
                      height: 1200,
                    },
                  }}
                />
              </div>
              <div className="mt-5 w-full">
                <Slider {...settings}>
                  {product?.images?.map((image) => (
                    <div
                      key={image}
                      className="px-[5px]"
                      onClick={() => setImage(image)}
                    >
                      <img
                        src={image}
                        alt="thumbnail"
                        className="object-cover border border-gray-300 rounded-md cursor-pointer"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          <div className="w-2/5">
            <h3 className="text-3xl font-semibold">
              {formatMoney(product?.price)}
            </h3>
            <div className="mt-4 flex items-center gap-2">
              <span className="flex items-center text-lg">
                {renderStartFromNumber(product?.totalRatings)}
              </span>
              <span className="text-sm text-gray-600">
                {product.ratings?.length} reviews
              </span>
              <span className="text-sm text-gray-600 px-3 border-l border-gray-400">
                ({product?.sold} sold)
              </span>
            </div>
            <div className="mt-5">
              <ul className="list-disc flex flex-col gap-1 pl-4">
                {product?.description?.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <span className="font-semibold">Quantity:</span>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
              />
            </div>
            <div>
              <Button name="Add to cart" style="w-full uppercase" />
            </div>
          </div>
          <div className="w-1/5 flex flex-col gap-[10px]">
            {productExtraInfo.map((item) => (
              <ProductExtraInfoItem
                key={item.id}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
        <div className="">
          <ProductInformation totalRating={product.totalRatings} totalCount={18} />
        </div>
        <div className="my-5">
          <div className="w-full border-b-2 border-primary">
            <h3 className="text-grayDark uppercase text-xl font-semibold py-4">
              other customers also buy:
            </h3>
          </div>
          <div className="mt-5 mx-[-10px]">
            <CustomSlider products={relatedProducts} />
          </div>
        </div>
      </div>
      <div className="h-[200px] w-full"></div>
    </div>
  );
};

export default DetailProduct;
