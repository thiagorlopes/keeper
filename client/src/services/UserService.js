import http from "../utils/http-common";

const signup = (callback, data) => {
  return http.post("/users/signup", data)
    .then((response) => {
      callback(response.data.id);
    })
    .catch((e) => {
      console.log(e);
    });
};

const login = (callback, data) => {
  return http.post("/users/login", data)
    .then((response) => {
      console.log("id: " + response.data.id);
      if(response) {
        callback(response.data.id);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export default {
  signup,
  login
};
