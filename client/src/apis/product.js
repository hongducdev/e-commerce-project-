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

export const apiRating = async (data) => {
  return axios({
    url: `/product/ratings`,
    method: "PUT",
    data
  });
} 
