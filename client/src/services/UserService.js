import http from "../utils/http-common";

const create = (data) => {
  return http.post("/users/", data);
};

const get = (userId) => {
  return http.get("/users/" + userId);
};

export default {
  create,
  get
};
