import React from "react";
import { apiGetCategory } from "../apis/app";

const Sidebar = () => {
  const [categories, setCategories] = React.useState(null);
  const getCategories = async () => {
    const response = await apiGetCategory();
    if (response.success === true) setCategories(response.productCategories);
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  console.log(categories);

  return <div>Sidebar</div>;
};

export default Sidebar;
