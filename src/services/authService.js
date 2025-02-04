// import api from "../api";
// import kyc from "../api/kyc";
import { handleErrors } from "../utils/handleResponse";
import api from "../api/api";
import kycApi from "../api/kyc.api";
import smileIdApi from "../api/smileId.api";
import {
  decryptResponse,
  encryptRequest,
  generateRequestHmac,
} from "../utils/encrypt";
import { CURRENT_DATE } from "../constants";

const authService = {
  checkBVNorNIN: async (number) => {
    try {
      console.log(typeof parseInt(number));
      const encryptedRequest = await encryptRequest(
        `number=${parseInt(number)}`
      );
      const response = await api.encget(
        "/validate/IsExistBvnOrNIN?" + encryptedRequest
      );
      const decryptedData = await decryptResponse(response.data);
      console.log(decryptedData);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw decryptedData;
    }
  },
  verifyBVN: async (kycData) => {
    try {
      const response = await smileIdApi.get(
        "/Validation/ValidateBvn?bvn=" + kycData.number.trim()
      );
      return response;
    } catch (error) {
      console.log(error);
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw decryptedData;
    }
  },

  verifyNIN: async (kycData) => {
    try {
      const response = await smileIdApi.get(
        "/Validation/ValidateNin_V2?Nin_V2=" + kycData.number.trim()
      );
      return response;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw decryptedData;
    }
  },

  livenessCheck: async (data, type) => {
    try {
      const response = await kycApi.post(
        `/QoreId/${type === "bvn" ? "BVNLivenessCheck" : "NINLivenessCheck"}`,
        data
      );
      return response;
    } catch (error) {
      // handleErrors(error);
      console.log(error);
      throw error;
    }
  },
  signup: async (signupData) => {
    try {
      const response = await api.post("/account/register-new-user", signupData);
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw decryptedData;
    }
  },
  sendOtp: async (otpData) => {
    try {
      const { phoneOrAccountnumber, email } = otpData;
      const emailVal = email ? email : "test@gmail.com";
      const query = `PhoneOrAccountnumber=${phoneOrAccountnumber}&Email=${emailVal}`;
      const encryptedRequest = await encryptRequest(query);
      const response = await api.encget(
        `/account/send-otp?${encryptedRequest}`
      );
      const decryptedResponse = await decryptResponse(response.data);
      return decryptedResponse;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw decryptedData;
    }
  },

  verifyOtp: async (otpData) => {
    const { phoneNumber, otp } = otpData;
    try {
      const query = `otpNumber=${otp}&phoneNumber=${phoneNumber}`;
      const encryptedRequest = await encryptRequest(query);
      const response = await api.encget(
        `/validate/OtpVerification?${encryptedRequest}`
      );
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  registerExisting: async (registrationData) => {
    try {
      const response = await api.post(
        "/account/register-existing-user",
        registrationData
      );
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
    }
  },

  createAdditionalAccount: async (accountData) => {
    try {
      const response = await api.post(
        "/account/create-additional-account",
        accountData
      );
      return response.data;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
    }
  },
  accountTierUpgrade: async (accountData) => {
    try {
      const response = await api.post(
        "/account/account-tier-upgrade",
        accountData
      );
      return response.data;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
    }
  },
  login: async (loginData) => {
    try {
      const hmac = generateRequestHmac(
        loginData.clientId,
        CURRENT_DATE,
        loginData.requestID
      );

      const response = await api.post("/account/login", loginData, {
        headers: {
          "X-ARM-Api-HMAC": hmac,
        },
      });
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  forgotPassword: async (forgotPasswordData) => {
    try {
      const response = await api.post(
        "/settings/forget-password",
        forgotPasswordData
      );
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  forgotPasswordOtp: async (forgotPasswordData) => {
    try {
      const response = await api.post(
        "/settings/forget-password-otp",
        forgotPasswordData
      );
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  resetPassword: async (resetPasswordData) => {
    try {
      const response = await api.post(
        "/settings/password-reset",
        resetPasswordData
      );
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  setSecurityQuestion: async (securityAnswers) => {
    try {
      const response = await api.post(
        "/settings/set-SecretQuestion-Answer",
        securityAnswers
      );
      const decryptedData = await decryptResponse(response.data);
      return decryptedData;
    } catch (error) {
      const decryptedData = await decryptResponse(error.response.data);
      handleErrors(decryptedData);
      throw error;
    }
  },

  logOut: async (logoutData) => {
    try {
      const { username, customerId } = logoutData;
      const query = `username=${username}&customerId=${customerId}`;
      const encryptedRequest = await encryptRequest(query);
      const response = await api.encpost(`/account/logout?${encryptedRequest}`);
      const decryptedResponse = await decryptResponse(response.data);
      return decryptedResponse;
    } catch (error) {
      console.log(error);
      handleErrors(error.response.data.Message);
      throw error;
    }
  },
};

export default authService;
