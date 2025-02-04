import { handleErrors } from "../utils/handleResponse";
import api from "../api/api";
import coralApi from "../api/coral.api";
import { decryptResponse } from "../utils/encrypt";

const billsService = {
  getNetworkPlans: async () => {
    try {
      const response = await api.get("/bills/network-plans");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
    }
  },

  getBillerGroup: async () => {
    try {
      const response = await coralApi.get("/Lookup/BillerGroup");
      return response;
    } catch (error) {
      handleErrors(error);
    }
  },

  getBillerGroupProvider: async (id) => {
    try {
      const response = await coralApi.get("/Lookup/BillerGroup/" + id);
      return response;
    } catch (error) {
      handleErrors(error);
    }
  },

  getBillerGroupPackage: async (slug) => {
    try {
      const response = await coralApi.get("/Lookup/BillersSlug/" + slug);
      return response;
    } catch (error) {
      handleErrors(error);
    }
  },

  makePayment: async (data) => {
    try {
      const response = await api.post("/bills/make-payment", data);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
    }
  },

  vend: async (data) => {
    try {
      const response = await api.post("/bills/vend", data);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
    }
  },
};

export default billsService;
