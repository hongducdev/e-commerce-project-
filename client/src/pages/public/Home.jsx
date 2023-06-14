import { Link } from "react-router-dom";
import { Banner, BestSeller, DealDaily, Sidebar } from "../../components";

const Home = () => {
  return (
    <div className="w-main flex">
      <div className="flex flex-col gap-5 w-[25%] flex-auto">
        <Sidebar />
        <DealDaily />
      </div>
      <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
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
    </div>
  );
};

export default Home;
