import React, { useMemo } from "react";
import { useState } from "react";
import AuthService from "../../services/AuthService";
import Users from "../../services/Users";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const rerender = React.useReducer(() => ({}), {})[9999];
  let counter = 0;

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

  function deleteUser(id) {
    Users.deleteById(id)
      .then(
        Users.getAll().then((response) => {
          setUsers(response.data);
        })
      )
      .catch(function (error) {
        if (500 === error.response.status) {
          AuthService.refreshToken().then((response) => {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
          });
          Users.deleteById(id).then(
            Users.getAll().then((response) => {
              setUsers(response.data);
            })
          );
        }
      });
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr key={item.id}>
                <td>{++counter}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate("/user/" + item.id + "/edit")}
                  >
                    <FiEdit />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-dark"
                    onClick={() => deleteUser(item.id) && rerender()}
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

export default UsersTable;
