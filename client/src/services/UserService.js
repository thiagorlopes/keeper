import http from "../utils/http-common";

const API_URL = "http://127.0.0.1:9000/notes/";

const getUserBoard = () => {
    return http.get(API_URL + "user", {headers: authHeader()})
}

export default getUserBoard;