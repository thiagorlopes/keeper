import axios from "axios";
import authHeader from "../utils/auth-header";

const signup = (username, email, password) => {
  return axios.post("/auth/signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post("/auth/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  signup,
  login,
  logout,
  getCurrentUser,
};