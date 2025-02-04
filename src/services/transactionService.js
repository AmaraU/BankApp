import api from "../api/api";
import outboundApi from "../api/outbound.api";
import { USER } from "../constants";
import { decryptResponse, encryptRequest } from "../utils/encrypt";
import { handleErrors, handleSuccess } from "../utils/handleResponse";

const transactionService = {
  transactionHistory: async (number) => {
    try {
      const { casaAccountBalances } = USER;
      const data = JSON.stringify(
        `Row=${number}&AccountNumber=${casaAccountBalances[0]?.accountnumber}`
      );

      const encryptedRequest = await encryptRequest(data);
      const response = await api.encget(
        `/report/transaction-history?${encryptedRequest}`
      );
      const decryptedData = await decryptResponse(response.data);
      console.log(decryptedData)
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      console.log(decryptedData);
      throw decryptedData;
    }
  },

  getDefaultTransactionLimit: async () => {
    try {
      const response = await api.get("/transaction/default-limits");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw decryptedData;
    }
  },

  getTransactionLimit: async () => {
    try {
      const response = await api.get("/transaction/get-transaction-limit");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      console.log(decryptedData);
      throw decryptedData;
    }
  },

  setTransactionLimit: async (data) => {
    try {
      const response = await api.post(
        "/transaction/set-transaction-limit",
        data
      );
      console.log(response);
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  updateTransactionLimit: async () => {
    try {
      const response = await api.put("/transaction/update-transaction-limit");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  banks: async () => {
    try {
      const response = await outboundApi.get("/Outbound/BankCodes");
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  statementRequest: async (data) => {
    try {
      const response = await api.post("/report/statement-request", data);
      const decryptedData = await decryptResponse(response.data);
      console.log(decryptedData);
      handleSuccess(decryptedData.result.message);
      return response;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      console.log(decryptedData);
      handleErrors(decryptedData);
      throw error;
    }
  },
};

export default transactionService;
