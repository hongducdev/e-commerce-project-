import React from 'react';
import {useSelector} from "react-redux";
import {Outlet, useNavigate} from "react-router-dom";
import path from "../../ultils/path";

const MemberLayout = () => {
  const navigate = useNavigate();
  const {isLogin, current} = useSelector(state => state.user);
  if (!isLogin || !current) {
    navigate(`/${path.LOGIN}`)
  }

  return (
    <div>
      MemberLayout
      <Outlet/>
    </div>
  );
};

export default MemberLayout;
