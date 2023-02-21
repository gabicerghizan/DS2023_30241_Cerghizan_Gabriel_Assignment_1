import React, { useState, useMemo, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Device from "../../services/Device";
import Users from "../../services/Users";

function UpdateDeviceForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deviceData, setDeviceData] = useState({
    id: "",
    username: "",
    location: "",
  });

  useMemo(() => {
    const getUsers = () => {
      Users.getAll()
        .then((response) => {
          setUsers(response.data);
        })
        .catch(function (error) {
          if (500 === error.response.status) {
            AuthService.refreshToken().then((response) => {
              localStorage.setItem("access_token", response.data.access_token);
              localStorage.setItem(
                "refresh_token",
                response.data.refresh_token
              );
            });
            Users.getAll().then((response) => {
              setUsers(response.data);
            });
          }
        });
    };

    const getDeviceById = () => {
      //find the url
      let url = window.location.href;
      //set the pattern and find a number between / and /
      let pattern = new RegExp(/\/(\d+)/gi);
      let deviceId = url.match(pattern);
      //get rid of the '/'
      deviceId = deviceId[0].substring(1, 8);

      Device.getDeviceById(deviceId)
        .then((response) => {
          setDeviceData(response.data);
        })
        .catch(function (error) {
          if (500 === error.response.status) {
            AuthService.refreshToken().then((response) => {
              localStorage.setItem("access_token", response.data.access_token);
              localStorage.setItem(
                "refresh_token",
                response.data.refresh_token
              );
            });
            Device.getDeviceById(deviceId).then((response) => {
              setDeviceData(response.data);
            });
          }
        });
    };

    getUsers();
    getDeviceById();
  }, []);

  useEffect(() => {
    const isUserAdmin = () => {
      let roles = AuthService.getCurrentUserRoles();
      for (let role in roles) {
        if (roles[role] === "ROLE_MANAGER") {
          setIsAdmin(true);
        }
      }
    };
    isUserAdmin();
  }, []);

  const onSubmit = (data) => {
    const device = {
      id: deviceData.id,
      username:
        undefined !== data.username ? data.username : deviceData.username,
      location: deviceData.location,
    };

    if (!isAdmin) {
      device.username = AuthService.getCurrentUsername();
    }

    Device.updateDevice(deviceData.id, device)
      .then((response) => {
        navigate("/devices");
      })
      .catch(function (error) {
        if (500 === error.response.status) {
          AuthService.refreshToken().then((response) => {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
          });
          Device.updateDevice(deviceData.id, device).then((response) => {
            navigate("/devices");
          });
        }
      });
  };

  const handleChange = (event) => {
    setDeviceData({
      ...deviceData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="mx-auto my-36 flex h-[350px] w-[450px] flex-col border-2 bg-white text-black shadow-xl">
      <div className="mx-16 mt-8 mb-3 flex flex-row justify-left space-x-2">
        <div className="h-10 w-3 bg-[#0DE6AC]"></div>
        <div className="text-center font-sans text-xl font-bold">
          <h3>Update device</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          {!isAdmin && (
            <input
              className="my-2 w-72 border p-2"
              placeholder={AuthService.getCurrentUsername()}
              disabled={!isAdmin}
              onChange={handleChange}
              value={AuthService.getCurrentUsername()}
              {...register("username")}
            />
          )}
          {isAdmin && (
            <div className="my-2 w-72 p-2">
              <Form.Select
                className="my-2 w-85 border p-2"
                onChange={handleChange}
                {...register("username")}
              >
                <option>Select user</option>
                {users.map((item) => {
                  return <option key={item.username}>{item.username}</option>;
                })}
              </Form.Select>
            </div>
          )}

          <input
            className="my-2 w-72 border p-2"
            {...register("location")}
            placeholder="Location"
            value={deviceData.location}
            onChange={handleChange}
          />
        </div>
        <div className="my-2 flex justify-center">
          <button
            className="w-72 border bg-[#EDCBFD] p-2 font-sans"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateDeviceForm;
