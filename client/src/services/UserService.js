import http from "../utils/http-common";

const getCurrent = (callback) => {
  return http.get("users/current").then((response) => {
    callback(response.data);
  })
  .catch((e) => {
    console.log(e);
  })
}

const signup = (callback, setValidation, data) => {

  return http.post("/users/signup", data).then((response) => {
      if(response.data.success) {
        console.log("Successful signup");
        setValidation({});
        callback(response.data);
      } else
      callback(false);
    })
    .catch((e) => {
      console.log(e.response.data);
      if(!e.response.data.unique) {
        setValidation(e.response.data);
      }
      console.log(e);
    });
};

const login = (callback, data) => {
  return http.post("/users/login", data).then((response) => {
      if(response.data.success) {
        console.log("succesful login");
      } else {
        alert("wrong username or password");
      }
      callback(response.data);
    })
    .catch((e) => {
      alert(e.response.data.message);
      callback(e);
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

const forgot = (callback, data) => {
  return http.post("/users/forgot", data).then((response) => {
    callback(response.data);
  })
  .catch((e) => {
    alert(e.response.data.message);
  });
};

const reset = (callback, data, token) => {
  return http.post(`/reset/${token}`, data).then((response) => {
    callback(response.data);
  })
  .catch((e) => {
    callback(e.response.data);
  });
};

export default {
  getCurrent,
  signup,
  login,
  logout,
  forgot,
  reset
};
