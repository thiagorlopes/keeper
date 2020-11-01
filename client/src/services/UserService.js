import http from "../utils/http-common";

const signup = (callback, data) => {

  return http.post("/users/signup", data).then((response) => {
      if(response.data.success) {
        console.log("Successful signup");
        callback(response.data);
      } else {
        console.log("Something went wrong during signup");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

const login = (callback, data) => {
  return http.post("/users/login", data).then((response) => {
      if(response.data.success) {
        console.log("succesful login");
        callback(response.data);
      } else {
        console.log("wrong username or password");
      }

    })
    .catch((e) => {
      console.log(e);
    });
};

const logout = (callback) => {
  return http.get("/users/logout").then((response) => {
    if(response.data.success) {
      console.log("successful logout");
      callback(response.data);
    } else {
      console.log("something went wrong during signout");
    }
  })
  .catch((e) => {
    console.log(e);
  });
};

export default {
  signup,
  login,
  logout
};
