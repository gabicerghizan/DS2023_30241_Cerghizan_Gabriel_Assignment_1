import { Host } from "./Host";
import { axiosInstance } from "./Axios";

const endpoint = {
  device: "device/",
  getAllByToken: "user",
  getAll: "getAll",
  addDevice: "device",
};

class Device {
  getAllFromCurrentUser() {
    return axiosInstance.get(
      Host.backend_api + endpoint.device + endpoint.getAllByToken,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  deleteDeviceById(id) {
    return axiosInstance.put(Host.backend_api + endpoint.device + id);
  }

  addDevice(device) {
    return axiosInstance.post(Host.backend_api + endpoint.addDevice, device);
  }

  getAll() {
    return axiosInstance.get(
      Host.backend_api + endpoint.device + endpoint.getAll
    );
  }

  getDeviceById(id) {
    return axiosInstance.get(Host.backend_api + endpoint.device + id);
  }

  updateDevice(id, device) {
    return axiosInstance.patch(Host.backend_api + endpoint.device + id, device);
  }
}

export default new Device();
