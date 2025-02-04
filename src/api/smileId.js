import axios from "axios";
import { handleErrors } from "../utils/handleResponse";

// Create an instance of axios
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SMILEID_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      handleErrors(error.response?.data.message);
    }
    if (error.response?.status === 500) {
      handleErrors(error.response?.data.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
