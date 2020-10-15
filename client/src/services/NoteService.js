import http from "./http-common";

const API_URL = "http://127.0.0.1:9000/notes/";

const create = (data) => {
  return http.post(API_URL, data);
};

const getAll = () => {
  return http.get(API_URL);
};

const get = (id) => {
  return http.get(API_URL + id);
};

const update = (id, data) => {
  return http.put(API_URL + id, data);
};

const remove = (id) => {
  return http.delete(API_URL + id);
};

const removeAll = () => {
  return http.delete(API_URL);
};

export default {
  create,
  getAll,
  get,
  update,
  remove,
  removeAll,
};
