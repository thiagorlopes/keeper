import http from "../http-common";

const create = (data) => {
  return http.post("http://127.0.0.1:9000/notes", data);
};

const getAll = () => {
  return http.get("http://127.0.0.1:9000/notes");
};

const get = (id) => {
  return http.get("http://127.0.0.1:9000/notes/" + id);
};

const update = (id, data) => {
  return http.put("http://127.0.0.1:9000/notes/" + id, data);
};

const remove = (id) => {
  return http.delete("http://127.0.0.1:9000/notes/" + id);
};

const removeAll = () => {
  return http.delete("http://127.0.0.1:9000/notes");
};

export default {
  create,
  getAll,
  get,
  update,
  remove,
  removeAll,
};
