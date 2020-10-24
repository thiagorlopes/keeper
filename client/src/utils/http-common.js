import axios from "axios";

export default axios.create({
  baseUrl: "/",
  headers: {
    "Content-type": "application/json",
  },
});
