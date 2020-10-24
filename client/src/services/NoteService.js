import http from "../utils/http-common";

const create = (data) => {
  return http.post("/notes/", data);
};

const getAll = () => {
  return http.get("/notes/");
};

const get = (id) => {
  return http.get("/notes/" + id);
};

const update = (id, data) => {
  return http.put(`/notes/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/notes/${id}`);
};

const removeAll = () => {
  return http.delete("/notes/");
};

export default {
  create,
  getAll,
  get,
  update,
  remove,
  removeAll,
};
