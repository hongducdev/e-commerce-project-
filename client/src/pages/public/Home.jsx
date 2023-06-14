import { Link } from "react-router-dom";
import { Banner, BestSeller, Sidebar } from "../../components";

const Home = () => {
  return (
    <div className="w-main flex">
      <div className="flex flex-col gap-5 w-[20%] flex-auto">
        <Sidebar />
        <span className="">deal</span>
      </div>
      <div className="flex flex-col gap-5 pl-5 w-[80%] flex-auto">
        <Banner />
        <BestSeller />
        <div className="grid grid-cols-2 gap-5">
          <Link to="/">
            <img src="/laptop-dell.webp" alt="" className="w-full rounded-md" />
          </Link>
          <Link to="/">
            <img src="/macbook.webp" alt="" className="w-full rounded-md" />
          </Link>
        </div>
      </div>
      <div className="h-[200px]"></div>
    </div>
  );
};

export default Home;
