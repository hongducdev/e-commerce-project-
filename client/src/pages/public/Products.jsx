import { useParams, useSearchParams } from "react-router-dom";
import {
  Breadcrumbs,
  Pagination,
  Product,
  SearchItem,
  SelectOptions,
} from "../../components";
import { useCallback, useEffect, useState } from "react";
import * as apis from "../../apis";
import { sortOptions } from "../../ultils/contants";

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [activeClick, setActiveClick] = useState(null);
  const [sort, setSort] = useState("");
  const [params] = useSearchParams();

  const fetchProducts = async (queries) => {
    const response = await apis.getProducts({
      category,
      ...queries,
    });
    if (response.success) {
      setProducts(response);
    }
  };

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) {
      param.push(i);
    }
    const queries = {};
    for (let i of param) {
      queries[i[0]] = i[1];
    }

    if (queries.from) {
      queries.price = { ...queries.price, gte: queries.from };
      delete queries.from;
    }

    if (queries.to) {
      queries.price = { ...queries.price, lte: queries.to };
      delete queries.to;
    }

    fetchProducts(queries);
    window.scrollTo(0, 0);
  }, [category, params]);

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

  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  useEffect(() => {
    const queries = {};
    if (sort) {
      queries.sort = sort;
    }
    fetchProducts(queries);
    window.scrollTo(0, 0);
  }, [sort]);

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
                type="input"
              />
              <SearchItem
                name="color"
                activeClick={activeClick}
                changeActiveFilter={changeActiveFilter}
                type="checkbox"
              />
            </div>
          </div>
          <div className="w-1/5 flex-auto flex-col flex gap-3">
            <span className="text-sm font-semibold">Sort by</span>
            <SelectOptions
              value={sort}
              options={sortOptions}
              changeValue={changeValue}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-4 ">
          {products?.productData?.map((product) => (
            <Product key={product._id} product={product} noSlider />
          ))}
        </div>
      </div>
      <div className="w-main mx-auto my-10 flex justify-end">
        <Pagination totalCount={products.counts} />
      </div>
      <div className="w-full h-[200px]"></div>
    </div>
  );
};

export default Products;
