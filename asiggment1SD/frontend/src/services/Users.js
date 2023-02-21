import { Host } from "./Host";
import { axiosInstance } from "./Axios";

const endpoint = {
  user: "user",
  getAll: "getAll",
};

class Users {
  getAll() {
    return axiosInstance.get(
      Host.backend_api + endpoint.user + "/" + endpoint.getAll
    );
  }

  deleteById(id) {
    return axiosInstance.put(Host.backend_api + endpoint.user + "/" + id);
  }

  getUserById(id) {
    return axiosInstance.get(Host.backend_api + endpoint.user + "/" + id);
  }

  updateUser(id, user) {
    return axiosInstance.patch(
      Host.backend_api + endpoint.user + "/" + id,
      user
    );
  }
}

export default new Users();
