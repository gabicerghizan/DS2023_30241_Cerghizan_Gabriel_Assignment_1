import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Device from "../../services/Device";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineHistory } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import AuthService from "../../services/AuthService";

function DeviceTable() {
  const [data, setData] = useState([]);
  const rerender = React.useReducer(() => ({}), {})[99999];
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAllDevices, setShowAllDevices] = useState(false);
  let counter = 0;

  useMemo(() => {
    const getDeviceData = () => {
      Device.getAllFromCurrentUser()
        .then((response) => {
          setData(response.data);
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
            Device.getAllFromCurrentUser().then((response) => {
              setData(response.data);
            });
          }
        });
    };
    getDeviceData();
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

  function deleteDevice(id) {
    Device.deleteDeviceById(id)
      .then(
        Device.getAllFromCurrentUser().then((response) => {
          setData(response.data);
        })
      )
      .catch(function (error) {
        if (500 === error.response.status) {
          AuthService.refreshToken().then((response) => {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
          });
          Device.deleteDeviceById(id).then(
            Device.getAllFromCurrentUser().then((response) => {
              setData(response.data);
            })
          );
        }
      });
  }

  function handleRedirect() {
    navigate("/device/add");
  }

  function handleSeeAllDevices() {
    Device.getAll()
      .then((response) => {
        setData(response.data);
        setShowAllDevices(true);
      })
      .catch(function (error) {
        if (500 === error.response.status) {
          AuthService.refreshToken().then((response) => {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
          });
          Device.getAll().then((response) => {
            setData(response.data);
            setShowAllDevices(true);
          });
        }
      });
  }

  function handleSeeOnlyMyDevices() {
    Device.getAllFromCurrentUser()
      .then((response) => {
        setData(response.data);
        setShowAllDevices(false);
      })
      .catch(function (error) {
        if (500 === error.response.status) {
          AuthService.refreshToken().then((response) => {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
          });
          Device.getAllFromCurrentUser().then((response) => {
            setData(response.data);
            setShowAllDevices(false);
          });
        }
      });
  }

  return (
    <div>
      <div className="flex justify-start">
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleRedirect}
            >
              Add new device
            </button>
            {isAdmin && !showAllDevices && (
              <button
                type="button"
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={handleSeeAllDevices}
              >
                See all devices
              </button>
            )}
            {isAdmin && showAllDevices && (
              <button
                type="button"
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={handleSeeOnlyMyDevices}
              >
                See only my devices
              </button>
            )}
          </div>
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Location</th>
            <th>Maximum value</th>
            <th>See history</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{++counter}</td>
                <td>{item.username}</td>
                <td>{item.location}</td>
                <td>{item.maximumMeasurement}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate("/history/" + item.id)}
                  >
                    <AiOutlineHistory />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate("/device/" + item.id + "/edit")}
                  >
                    <FiEdit />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-dark"
                    onClick={() => deleteDevice(item.id) && rerender()}
                  >
                    <BsFillTrashFill />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default DeviceTable;
