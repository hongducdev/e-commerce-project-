import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import path from "../../ultils/path";

const AdminLayout = () => {

  const {isLogin, current} = useSelector(state => state.user);
  if (!isLogin || !current || +current.role !== 1001) {
    <Navigate to={`/${path.LOGIN}`} replace={true} />
  }

  return (
    <div>
      AdminLayout
      <Outlet />
    </div>
  )
}

export default AdminLayout