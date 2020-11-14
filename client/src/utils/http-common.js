import axios from "axios";

export default axios.create({
  baseUrl: "/",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});
