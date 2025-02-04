import api from "../api/api";
import { decryptResponse, encryptRequest } from "../utils/encrypt";
import { handleErrors, handleSuccess } from "../utils/handleResponse";

const userService = {
  dashboardSummary: async () => {
    try {
      const response = await api.get("/report/dashboard-summary");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  accountBalance: async () => {
    try {
      const response = await api.get("/profile/get-accounts");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  setTransactionPin: async (data) => {
    try {
      const response = await api.post("/settings/set-transaction-pin", data);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  getSetupStatus: async () => {
    try {
      const response = await api.get("/profile/setup-status");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      console.log(decryptedData);
      throw error;
    }
  },

  verifyEmailOtp: async (data) => {
    try {
      const response = await api.post("/validate/EmailVerifyOtp", data);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },
  validateEmail: async (data) => {
    const { otpNumber, EmailAddress } = data;
    try {
      const response = await api.encget(
        `/validate/EmailVerification?otpNumber=${otpNumber}&EmailAddress=${EmailAddress}`
      );
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  getCustomerDetails: async () => {
    try {
      const response = await api.get("/profile/customer-details");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      console.log(decryptedData)
      throw error;
    }
  },

  updateCustomerDetails: async (data) => {
    try {
      const response = await api.put("/profile/update-customer-details", data);
      handleSuccess("Profile updated successfully");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  getContactDetails: async () => {
    try {
      const response = await api.get("/profile/contact-details");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  updateContactDetails: async (data) => {
    try {
      const response = await api.put("/profile/update-contact-details", data);
      handleSuccess("Contact details updated successfully");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  verifyPin: async (data) => {
    try {
      const dataStr = `transactionPIN=${data}`;
      const encryptedRequest = await encryptRequest(dataStr);
     
      const response = await api.encget(
        `/validate/TransactionPIN?${encryptedRequest}`
      );
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  changePassword: async (data) => {
    try {
      const response = await api.post("/settings/changepassword", data);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  resetPin: async (data) => {
    try {
      const response = await api.post("/settings/set-transaction-pin", data);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  forgotPin: async (data) => {
    try {
      const response = await api.post("/settings/reset-transaction-pin", data);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  getBvnInfo: async () => {
    try {
      const response = await api.get("/validate/bvn-info");
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      // handleErrors(error);
      console.log(error);
      throw error;
    }
  },

  updateBvn: async (bvn) => {
    try {
      const response = await api.put("/profile/bvn", bvn);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      console.log(decryptedData);
      throw error;
    }
  },

  updateNin: async (nin) => {
    try {
      const response = await api.put("/profile/nin", nin);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      console.log(decryptedData);
      throw error;
    }
  },

  validateSecurityAnswer: async (data) => {
    try {
      const response = await api.post("/validate/secret-answer", data);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  changePin: async (data) => {
    try {
      const response = await api.post("/settings/change-transaction-pin", data);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  uploadDocument: async (data) => {
    try {
      const response = await api.post("/utilities/upload-document", data);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },
};

export default userService;
