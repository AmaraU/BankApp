import { handleErrors } from "../utils/handleResponse";
import api from "../api/api";
import { decryptResponse } from "../utils/encrypt";

const utilsService = {
  getNationaties: async () => {
    try {
      const response = await api.get("/utilities/get-nationalities");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
    }
  },

  getSourceOfFunds: async () => {
    try {
      const response = await api.get("/utilities/source-of-funds");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
    }
  },

  getSecurityQuestion: async () => {
    try {
      const response = await api.get("/utilities/secret-questions");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
    }
  },

  getDocumentTypes: async () => {
    try {
      const response = await api.get("/utilities/document-types");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
    }
  },
};
export default utilsService;
