import { aesEncrypt, generateHmac } from "./encrypt";

const AES_KEY_FOR_DETAILS_REQUEST = "ZpJFemkqxFmkyvEZW/8xSA==";
const HMAC_AND_AES_KEY_FOR_ENC_REQUEST = "lM97ez5aC0taf/qj5VLCIQ==";

// const AES_KEY_FOR_DETAILS_REQUEST = "4pJFemkqxFmkyvEZW/8xSA==";
// const HMAC_AND_AES_KEY_FOR_ENC_REQUEST = "lM973z5aC5taf/qj5VLCIQ==";

// Function to generate HMAC

export const encrypt = ({
  s_C,
  a_N,
  a_P,
  n_P,
  p_N,
  u_P,
  v_C,
  t_P,
  username,
}) => {
  const transaction_ref =
    parseInt(Math.random() * 1000000000000) + "123234" + "JHK";
  const current_date = new Date()
    .toLocaleDateString("en-GB")
    .replace(/\//g, "-"); // dd-MM-yyyy

  console.log(current_date);

  // Step 1: Create details request and encrypt it using AES
  const data_params = {
    s_C,
    a_N,
    a_P,
    n_P,
    p_N,
    t_D: current_date,
    t_P,
    u_P,
    v_C,
    t_R: transaction_ref,
  };

  console.log(data_params);

  // Convert transfer_funds_params to JSON
  const detailsRequestJson = data_params;
  console.log(detailsRequestJson);
  const encryptedDetailsRequest = aesEncrypt(
    detailsRequestJson,
    AES_KEY_FOR_DETAILS_REQUEST
  );

  // {data_params.p_N}{current_date}{data_params.t_R}{Username}{data_params.a_N}{data_params.a_P}{data_params.v_C}

  // Step 2: Generate HMAC for enc request
  // const message = `${data_params.p_N}${data_params.t_D}${data_params.t_R}${username}${data_params.a_N}${data_params.a_P}${data_params.v_C}`;
  const message = [
    data_params.p_N,
    data_params.t_D,
    data_params.t_R,
    username,
    data_params.a_N,
    data_params.a_P,
    data_params.v_C,
  ].join("").trim();
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
