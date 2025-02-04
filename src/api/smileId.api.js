import smileId from "./smileId";

export default {
  get(url) {
    return smileId.get("/get?url=" + url);
  },

  post(url, data) {
    return smileId.post("/post?url=" + url, data);
  },

  put(url, data) {
    return smileId.put("/put?url=" + url, data);
  },

  delete(url, data) {
    return smileId.delete("/delete?url=" + url, { data });
  },
};
