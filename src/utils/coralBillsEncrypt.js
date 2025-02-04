import CryptoJS from "crypto-js";

const AES_KEY_FOR_DETAILS_REQUEST = "ZpJFemkqxFmkyvEZW/8xSA==";
const HMAC_AND_AES_KEY_FOR_ENC_REQUEST = "lM97ez5aC0taf/qj5VLCIQ==";

// const AES_KEY_FOR_DETAILS_REQUEST = "4pJFemkqxFmkyvEZW/8xSA==";
// const HMAC_AND_AES_KEY_FOR_ENC_REQUEST = "lM973z5aC5taf/qj5VLCIQ==";

// Function to perform AES encryption
const aesEncrypt = (jsonObject, key) => {
  const data = JSON.stringify(jsonObject);
  const iv = new Uint8Array(16);

  const keyBytes = CryptoJS.enc.Utf8.parse(key);
  const ivBytes = CryptoJS.lib.WordArray.create(iv);

  const encrypted = CryptoJS.AES.encrypt(data, keyBytes, { iv: ivBytes });

  // Return the encrypted data as a string
  return encrypted.toString(CryptoJS.format.Base64);
};

// Function to generate HMAC
const generateHmac = (message, secretKey) => {
  const hmac = CryptoJS.HmacSHA512(message, secretKey);
  return CryptoJS.enc.Base64.stringify(hmac);
};

export const encrypt = ({ p_S, a_P, a_N, c_Id, c_N, e_L, p_N, t_P, username }) => {
  //   const transaction_ref =
  //     parseInt(Math.random() * 1000000000000) + "123234" + "JHK";
    const current_date = new Date()
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-"); // dd-MM-yyyy

  // Step 1: Create details request and encrypt it using AES
  const data_params = {
    p_S,
    a_P,
    a_N,
    c_Id,
    c_N,
    e_L,
    p_N,
    t_P,
  };

  // Convert transfer_funds_params to JSON
  const detailsRequestJson = data_params;
  console.log(detailsRequestJson);
  const encryptedDetailsRequest = aesEncrypt(
    detailsRequestJson,
    AES_KEY_FOR_DETAILS_REQUEST
  );

  // {data_params.p_N}{current_date}{data_params.t_R}{Username}{data_params.a_N}{data_params.a_P}{data_params.v_C}

  // Step 2: Generate HMAC for enc request
  const message = `${data_params.c_Id}${current_date}${data_params.p_S}${username}${data_params.a_N}`;
  console.log("message", message);
  const encRequestHmac = generateHmac(
    message,
    HMAC_AND_AES_KEY_FOR_ENC_REQUEST
  );

  // Step 3: Encrypt HMAC using AES
  const encryptedEncRequest = aesEncrypt(
    encRequestHmac,
    HMAC_AND_AES_KEY_FOR_ENC_REQUEST
  );

  // Step 4: Build final payload
  return {
    encRequest: encryptedEncRequest,
    detailsRequest: encryptedDetailsRequest,
  };
};
