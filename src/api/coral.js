import axios from "axios";
import { handleErrors } from "../utils/handleResponse";

const kycClient = axios.create({
  baseURL: import.meta.env.VITE_CORAL_URL,
  timeout: 50000, 
  headers: {
    "Content-Type": "application/json"
  },
});


kycClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

kycClient.interceptors.response.use(
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

export default kycClient;
