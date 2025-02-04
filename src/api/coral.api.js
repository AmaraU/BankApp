import coral from "./coral.js";

export default {
  get(url) {
    return coral.get("/get?url=" + url);
  },

  post(url, data) {
    return coral.post("/post?url=" + url, data);
  },
};
