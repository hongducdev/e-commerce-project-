import { useParams } from "react-router-dom";
import { Breadcrumbs, Product, SearchItem } from "../../components";
import { useCallback, useEffect, useState } from "react";
import * as apis from "../../apis";

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [activeClick, setActiveClick] = useState(null);

  const fetchProducts = async (queries) => {
    const response = await apis.getProducts({ category: category });
    console.log(response);
    if (response.success) {
      setProducts(response.productData);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) {
        setActiveClick(null);
      } else {
        setActiveClick(name);
      }
    },
    [activeClick]
  );

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 h-[81px] flex items-center justify-center">
        <div className="w-main">
          <h3 className="text-lg font-semibold capitalize">{category}</h3>
          <Breadcrumbs category={category} />
        </div>
      </div>
      <div className="w-main mx-auto mt-9">
        <div className="flex p-3 border border-gray-300 rounded-md">
          <div className="w-4/5 flex-auto flex flex-col gap-3">
            <span className="text-sm font-semibold">Filter by</span>
            <div className="flex items-center gap-1">
              <SearchItem
                name="price"
                activeClick={activeClick}
                changeActiveFilter={changeActiveFilter}
              />
              <SearchItem
                name="color"
                activeClick={activeClick}
                changeActiveFilter={changeActiveFilter}
              />
            </div>
          </div>
          <div className="w-1/5 flex-auto">sort</div>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-4 ">
          {products.map((product) => (
            <Product key={product._id} product={product} noSlider />
          ))}
        </div>
      </div>
      <div className="w-full h-[200px]"></div>
    </div>
  );
};

export default Products;
