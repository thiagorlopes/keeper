import http from "../utils/http-common";


const getUserBoard = () => {
    return http.get("/user", {headers: authHeader()})
}

export default getUserBoard;