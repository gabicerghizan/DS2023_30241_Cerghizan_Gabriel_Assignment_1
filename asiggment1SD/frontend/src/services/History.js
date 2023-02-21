import { Host } from "./Host";
import { axiosInstance } from "./Axios";

const endpoint = {
  history: "history",
  getAll: "getAll",
  device: "device",
  delete: "delete",
};

class History {
  getAllByDeviceIdAndDate(id, date) {
    return axiosInstance.get(
      Host.backend_api + endpoint.history + "/" + endpoint.device + "/" + id,
      {
        params: { date: date },
      }
    );
  }

  deleteHistoryById(id) {
    return axiosInstance.put(Host.backend_api + endpoint.history + "/" + id);
  }
}

export default new History();
