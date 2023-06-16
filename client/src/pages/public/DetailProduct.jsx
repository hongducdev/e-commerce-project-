import { useParams } from "react-router-dom";

const DetailProduct = () => {
  const { pid } = useParams();

  return (
    <div>
      <h1>Detail Product</h1>
    </div>
  );
};

export default DetailProduct;
