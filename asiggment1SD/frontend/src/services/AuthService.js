import axios from "axios";
import jwt_decode from "jwt-decode";

const endpoint = {
  login: "login",
  register: "register",
  roles: "roles",
  refresh_token: "refresh_token",
};

class AuthService {
  login(credentials) {
    return axios({
      method: "POST",
      url: endpoint.login,
      headers: {
        "Content-Type": "application/json",
        username: credentials.username,
        password: credentials.password,
      },
    });
  }

  register(credentials) {
    return axios.post(endpoint.register, credentials);
  }

  getCurrentUserRoles() {
    const token = localStorage.getItem("access_token");
    const decodedToken = jwt_decode(token);

    return decodedToken.roles;
  }

  getCurrentUsername() {
    const token = localStorage.getItem("access_token");
    const decodedToken = jwt_decode(token);

    return decodedToken.sub;
  }

  refreshToken() {
    return axios({
      method: "GET",
      url: endpoint.refresh_token,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("refresh_token"),
      },
    });
  }
}

export function refreshPage() {
  window.location.reload(false);
}

export default new AuthService();
