export const BRANDCOLOR = "#A41856";

export const ARM_BANK_CODE = 999052;

export const AES_KEY_FOR_DETAILS_REQUEST = "ZpJFemkqxFmkyvEZW/8xSA==";

export const HMAC_AND_AES_KEY_FOR_ENC_REQUEST = "lM97ez5aC0taf/qj5VLCIQ==";

export const USER = JSON.parse(sessionStorage.getItem("user"));

export const MONTHS = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const CURRENT_DATE = new Date()
  .toLocaleDateString("en-GB")
  .replace(/\//g, "-"); // dd-MM-yyyy
