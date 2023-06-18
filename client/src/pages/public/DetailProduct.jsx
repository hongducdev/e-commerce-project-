import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as apis from "../../apis";

const DetailProduct = () => {
  const {pid} = useParams();
  const [product, setProduct] = useState([]);
  const getProduct = async () => {
    const response = await apis.apiGetProduct(pid);
    console.log(response.productData);
    if (response.success) {
      setProduct(response.productData);
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
          <h3 className="text-lg font-semibold">
            {product?.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
