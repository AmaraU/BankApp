import kyc from "./kyc.js";

export default {
  get(url) {
    return kyc.get("/get?url=" + url);
  },

  post(url, data) {
    return kyc.post("/post?url=" + url, data);
  },
};
