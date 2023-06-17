import axios from "../axios";

export const apiRegister = async (data) => {
  return axios({
    url: "/user/register",
    method: "POST",
    data,
  });
};

export const apiLogin = async (data) => {
  return axios({
    url: "/user/login",
    method: "POST",
    data,
  });
};
