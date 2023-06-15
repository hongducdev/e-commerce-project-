import { Link } from "react-router-dom";
import {
  Banner,
  BestSeller,
  DealDaily,
  FeatureProducts,
  Sidebar,
} from "../../components";

const Home = () => {
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
            <img src="/sale-70.webp" alt="sale" className="rounded-md h-full object-cover"  />
          </Link>
        </div>
        <div className="">
          <Link to="/">
            <img src="/olloclip.webp" alt="olloclip" className="rounded-md" />
          </Link>
        </div>
      </div>
      <div className="w-full h-[200px]"></div>
    </div>
  );
};

export default Home;
