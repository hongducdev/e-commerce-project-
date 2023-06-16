import { Link } from "react-router-dom";
import {
  Banner,
  BestSeller,
  CustomSlider,
  DealDaily,
  FeatureProducts,
  Sidebar,
} from "../../components";
import { useSelector } from "react-redux";

const Home = () => {
  const { newProducts } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.app);
  console.log("🚀 ~ Home ~ categories:", categories);

  return (
    <div>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto justify-between">
          <Banner />
          <BestSeller />
          <div className="flex items-center gap-x-5">
            <Link to="/">
              <img
                src="/laptop-dell.webp"
                alt=""
                className="w-full rounded-md"
              />
            </Link>
            <Link to="/">
              <img src="/macbook.webp" alt="" className="w-full rounded-md" />
            </Link>
          </div>
        </div>
      </div>
      <div className="my-5">
        <FeatureProducts />
      </div>
      <div className="w-full flex gap-5 justify-between">
        <div className="">
          <Link to="/">
            <img
              src="/headphone-asus.webp"
              alt="headphone"
              className="rounded-md"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-5 ">
          <Link to="/">
            <img
              src="/samsung-gear-s3.webp"
              alt="samsung-gear-s3"
              className="rounded-md"
            />
          </Link>
          <Link to="/" className="h-[50%]">
            <img
              src="/sale-70.webp"
              alt="sale"
              className="rounded-md h-full object-cover"
            />
          </Link>
        </div>
        <div className="">
          <Link to="/">
            <img src="/olloclip.webp" alt="olloclip" className="rounded-md" />
          </Link>
        </div>
      </div>
      <div className="my-5">
        <div className="w-full border-b-2 border-primary">
          <h3 className="text-grayDark uppercase text-xl font-semibold py-4">
            new arrivals
          </h3>
        </div>
        <div className="mt-5 mx-[-10px]">
          <CustomSlider products={newProducts} isNew />
        </div>
      </div>
      <div className="my-5">
        <div className="w-full border-b-2 border-primary">
          <h3 className="text-grayDark uppercase text-xl font-semibold py-4">
            hot collections
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-5 my-5">
          {categories
            .filter((el) => el?.brand.length > 0)
            .map((category) => (
              <div
                className="border border-gray-300 rounded-md p-4 flex gap-6"
                key={category._id}
              >
                <div className="w-1/3">
                  <img
                    src={category?.image}
                    alt="thumb"
                    className="w-[144px] h-[129px] object-contain"
                  />
                </div>
                <div className="">
                  <span className="text-sm uppercase text-grayDark font-semibold">
                    {category?.title}
                  </span>
                  <div className="mt-[10px] flex flex-col gap-1">
                    {category?.brand.map((brand) => (
                      <Link
                        to={`/products?category=${category?.title}&brand=${brand}`}
                        className="text-sm text-gray-500 hover:text-primary block"
                        key={brand}
                      >
                        {
                          `> ${brand}`
                        }
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="my-5">
        <div className="w-full border-b-2 border-primary">
          <h3 className="text-grayDark uppercase text-xl font-semibold py-4">
            blog posts
          </h3>
        </div>
        </div>
      <div className="w-full h-[200px]"></div>
    </div>
  );
};

export default Home;
