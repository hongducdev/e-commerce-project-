import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import path from "./ultils/path";
import {
  Blog,
  DetailProduct,
  FAQ,
  Home,
  Login,
  Product,
  Public,
  Services,
} from "./pages/public";
import { useDispatch } from "react-redux";
import { getCategories } from "./store/app/asyncActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.PRODUCTS} element={<Product />} />
          <Route path={path.BLOGS} element={<Blog />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
