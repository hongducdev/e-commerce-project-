import axios from "../axios";

export const apiGetCategory = () => {
  return axios({
    url: "/productcategory",
    method: "GET",
  });
};