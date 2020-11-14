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

const removeAll = (user_id) => {
  return http.delete(`/notes/${user_id}`);
};

const remove = (id) => {
  return http.delete(`/notes/${id}`);
};

export default {
  create,
  getAll,
  get,
  update,
  remove,
  removeAll,
};
