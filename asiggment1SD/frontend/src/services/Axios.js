import axios from "axios";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("access_token");
  config.headers = {
    Authorization: token,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return config;
});
