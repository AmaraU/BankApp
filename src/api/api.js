import api from "./index.js";

export default {
  get(url) {
    return api.get("/get?url=" + url);
  },

  encget(url) {
    return api.get("/encget?url=" + url);
  },

  encpost(url) {
    return api.post("/encpost?url=" + url);
  },

  put(url, data) {
    return api.put("/put?url=" + url, data);
  },

  async login(url, data) {
    return api.post("/login?url=" + url, data);
  },

  async post(url, data) {
    return api.post("/post?url=" + url, data);
  },

  delete(url, data) {
    return api.delete("/delete?url=" + url, { data });
  },
};
