import React, { useState, useMemo, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthService, { refreshPage } from "../../services/AuthService";
import Device from "../../services/Device";
import Users from "../../services/Users";

function AddDevice() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

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
    getUsers();
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
      username: data.username,
      location: data.location,
      maximumMeasurement: data.maximumMeasurement
    };

    if (!isAdmin) {
      device.username = AuthService.getCurrentUsername();
    }

    Device.addDevice(device)
      .then((response) => {
        navigate("/devices");
        refreshPage();
      })
      .catch(function (error) {
        if (500 === error.response.status) {
          AuthService.refreshToken().then((response) => {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
          });
          Device.addDevice(device).then((response) => {
            navigate("/devices");
            refreshPage();
          });
        }
      });
  };

  return (
    <div className="mx-auto my-36 flex h-[400px] w-[450px] flex-col border-2 bg-white text-black shadow-xl">
      <div className="mx-16 mt-8 mb-3 flex flex-row justify-left space-x-2">
        <div className="h-10 w-3 bg-[#0DE6AC]"></div>
        <div className="text-center font-sans text-xl font-bold">
          <h3>Add device</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          {!isAdmin && (
            <input
              className="my-2 w-72 border p-2"
              placeholder={AuthService.getCurrentUsername()}
              disabled={!isAdmin}
              value={AuthService.getCurrentUsername()}
              {...register("username")}
            />
          )}
          {isAdmin && (
            <div className="my-2 w-72 p-2">
              <Form.Select
                className="my-2 w-85 border p-2"
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
            placeholder="Location"
            {...register("location")}
          />
          <input
            className="my-2 w-72 border p-2"
            placeholder="Maximum measurement"
            {...register("maximumMeasurement")}
          />
        </div>
        <div className="my-2 flex justify-center">
          <button
            className="w-72 border bg-[#EDCBFD] p-2 font-sans"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDevice;
