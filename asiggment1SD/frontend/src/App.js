import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/constants";
import Login from "./pages/login";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home";
import Register from "./pages/register";
import ShowDevices from "./pages/devices";
import AddDevice from "./components/forms/addDeviceForm";
import History from "./pages/history";
import UpdateDevice from "./pages/updateDevice";
import UsersPage from "./pages/users";
import UpdateUser from "./pages/updateUser";

function App() {
  return (
    <div className="App">
      
      <Router>
        <Navbar />
        <Routes>
          <Route path={ROUTES.HOME} exact element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.DEVICES} element={<ShowDevices />} />
          <Route path={ROUTES.ADD_DEVICE} element={<AddDevice />} />
          <Route path={ROUTES.HISTORY} element={<History />} />
          <Route path={ROUTES.EDIT_DEVICE} element={<UpdateDevice />} />
          <Route path={ROUTES.USERS} element={<UsersPage />} />
          <Route path={ROUTES.EDIT_USER} element={<UpdateUser />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
