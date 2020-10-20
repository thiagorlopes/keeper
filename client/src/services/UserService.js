import http from "../utils/http-common";

const endpoint = process.env.REACT_APP_API_ENDPOINT || "http://localhost:9000";

const API_URL = endpoint + "/notes/";

const getUserBoard = () => {
    return http.get(API_URL + "user", {headers: authHeader()})
}

export default getUserBoard;