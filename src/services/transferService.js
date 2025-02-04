import api from "../api/api";
import outboundApi from "../api/outbound.api";
import { decryptResponse, encryptRequest } from "../utils/encrypt";
import { handleErrors, handleSuccess } from "../utils/handleResponse";

const transferService = {
  transferFunds: async (payload) => {
    try {
      const response = await api.post("/transaction/funds-transfer", payload);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  transferOutboundFunds: async (payload) => {
    try {
      const response = await outboundApi.post(
        "/Outbound/FundTransfer",
        payload
      );
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  saveBeneficiary: async (payload) => {
    try {
      const response = await api.post("/profile/save-beneficiary", payload);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  getBeneficiaries: async () => {
    try {
      const response = await api.get("/profile/get-beneficiaries");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      console.log(decryptedData);
      throw error;
    }
  },

  deleteBeneficiary: async (id) => {
    try {
      const response = await api.delete("/profile/delete-beneficiary", id);
      const decryptedData = await decryptResponse(response.data);
      return handleSuccess(decryptedData);
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  armAccountInquiry: async (payload) => {
    const { AccountNumber, BankCode } = payload;
    const encryptedRequest = await encryptRequest(
      `AccountNumber=${AccountNumber}&BankCode=${BankCode}`
    );
    console.log(encryptedRequest);
    try {
      const response = await api.encget(
        `/transaction/account-enquiry?${encryptedRequest}`
      );
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  accountInquiry: async (payload) => {
    const { AccountNumber, BankCode } = payload;
    try {
      const response = await outboundApi.get(
        `/Outbound/NameEnquiry/${BankCode}/${AccountNumber}`
      );
      return response.data;
    } catch (error) {
      handleErrors(error.response.data);
      throw error;
    }
  },
};

export default transferService;
