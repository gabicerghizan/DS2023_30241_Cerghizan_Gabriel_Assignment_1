import React from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Users from "../../services/Users";

function UpdateUserForm() {
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  const navigate = useNavigate();

  useMemo(() => {
    //find the url
    let url = window.location.href;
    //set the pattern and find a number between / and /
    let pattern = new RegExp(/\/(\d+)/gi);
    let userId = url.match(pattern);
    //get rid of the '/'
    userId = userId[0].substring(1, 8);

    Users.getUserById(userId)
      .then((response) => {
        setUser(response.data);
      })
      .catch(function (error) {
        if (500 === error.response.status) {
          AuthService.refreshToken().then((response) => {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
          });
          Users.getUserById(userId).then((response) => {
            setUser(response.data);
          });
        }
      });
  }, []);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (data) => {
    const credentials = {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
    };

    //find the url
    let url = window.location.href;
    //set the pattern and find a number between / and /
    let pattern = new RegExp(/\/(\d+)/gi);
    let userId = url.match(pattern);
    //get rid of the '/'
    userId = userId[0].substring(1, 8);

    Users.updateUser(userId, credentials)
      .then((response) => {
        navigate("/users");
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          console.log("Unauthorized");
        }
      });
  };

  return (
    <div className="mx-auto my-36 flex h-[500px] w-[450px] flex-col border-2 bg-white text-black shadow-xl">
      <div className="mx-16 mt-8 mb-3 flex flex-row justify-left space-x-2">
        <div className="h-7 w-3 bg-[#0DE6AC]"></div>
        <div className="w-3 text-center font-sans text-xl font-bold">
          <h1>Update account</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          <input
            {...register("firstname")}
            className="my-2 w-72 border p-2"
            placeholder="First Name"
            value={user?.firstname}
            onChange={handleChange}
          />
          <input
            {...register("lastname")}
            className="my-2 w-72 border p-2"
            placeholder="Last Name"
            value={user?.lastname}
            onChange={handleChange}
          />
          <input
            {...register("username")}
            className="my-2 w-72 border p-2"
            placeholder="Username"
            value={user?.username}
            onChange={handleChange}
          />
          <input
            {...register("email")}
            className="my-2 w-72 border p-2"
            placeholder="Email"
            type="email"
            value={user?.email}
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

export default UpdateUserForm;
