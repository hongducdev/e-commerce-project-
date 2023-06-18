import axios from "../axios";

export const getProducts = async (params) => {
  return axios({
    url: "/product",
    method: "GET",
    params,
  });
};

export const apiGetProduct = async (pid) => {
  return axios({
    url: `/product/${pid}`,
    method: "GET",
  })
};
