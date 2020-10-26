import axios from "axios";

class AuthService {
    login(username, password) {
        return axios
            .post("/login", {
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

    signup(username, email, password) {
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
