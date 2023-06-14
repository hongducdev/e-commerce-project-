import axios from "../axios";

export const getProducts = async (params) => {
  return axios({
    url: "/product",
    method: "GET",
    params,
  });
};
