import http from "../utils/http-common";
require("dotenv").config();

const endpoint = process.env.REACT_APP_API_ENDPOINT || "http://localhost:9000";

const API_URL = endpoint + "/notes/";
console.log(API_URL);

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
