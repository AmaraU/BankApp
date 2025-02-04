import outbound from "./outbound.js";

export default {
  get(url) {
    return outbound.get("/get?url=" + url);
  },

  post(url, data) {
    return outbound.post("/post?url=" + url, data);
  },

  put(url, data) {
    return outbound.put("/put?url=" + url, data);
  },

  delete(url, data) {
    return outbound.delete("/delete?url=" + url, { data });
  },
};
