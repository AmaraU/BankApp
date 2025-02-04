import axios from "axios";
import { handleErrors } from "../utils/handleResponse";

// Create an instance of axios
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
    if (error.response?.status === 400) {
      if (error.response.data.ResponseCode === "04") {
        handleErrors({ message: "Access Denied" });
        throw error;
      }

      if (error.response.data.ResponseCode === "08") {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("document");
        window.location.href = "/signin";
      }
    }
    if (error.response?.status === 401) {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("document");
      window.location.href = "/signin";
    }
    if (error.response?.status === 500) {
      handleErrors(error.response?.data.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
