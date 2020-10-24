import axios from "axios";

//const endpoint = process.env.REACT_APP_API_ENDPOINT || "http://localhost:9000";
//const API_URL = endpoint + "/notes/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post("/signin", {
                username,
                password
            })
            .then(response => {
                if(response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post("/signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();