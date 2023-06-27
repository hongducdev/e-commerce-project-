import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import path from "../../ultils/path";
import {AdminSidebar} from "../../components";

const AdminLayout = () => {

  const {isLogin, current} = useSelector(state => state.user);
  if (!isLogin || !current || +current.role !== 1001) {
    <Navigate to={`/${path.LOGIN}`} replace={true}/>
  }

  return (
    <div className="flex w-full min-h-screen relative">
      <div className="w-[327px] flex-none fixed top-0 bottom-0">
        <AdminSidebar/>
      </div>
      <div className="w-[327px]"></div>
      <div className="flex-auto">
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout