import axios from "../axios";

export const apiRegister = async (data) => {
  return axios({
    url: "/user/register",
    method: "POST",
    data,
    withCredentials: true,
  });
};

export const apiLogin = async (data) => {
  return axios({
    url: "/user/login",
    method: "POST",
    data,
  });
};

export const apiForgotPassword = async (data) => {
  return axios({
    url: "/user/forgotpassword",
    method: "POST",
    data
  });
};

export const apiResetPassword = async (data) => {
  return axios({
    url: "/user/resetpassword",
    method: "PUT",
    data
  });
};

export const apiGetCurrent = async (data) => {
  return axios({
    url: "/user/current",
    method: "GET",
    data,
  })
};
