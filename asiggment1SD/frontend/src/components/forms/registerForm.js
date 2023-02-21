import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

function RegisterForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const credentials = {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      password: data.password,
    };

    AuthService.register(credentials)
      .then((response) => {
        navigate("/login");
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
          <h1>Register</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          <input
            className="my-2 w-72 border p-2"
            placeholder="First Name"
            {...register("firstname")}
          />
          <input
            className="my-2 w-72 border p-2"
            placeholder="Last Name"
            {...register("lastname")}
          />
          <input
            className="my-2 w-72 border p-2"
            placeholder="Username"
            {...register("username")}
          />
          <input
            className="my-2 w-72 border p-2"
            placeholder="Email"
            type="email"
            {...register("email")}
          />
          <input
            className="my-2 w-72 border p-2"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>
        <div className="my-2 flex justify-center">
          <button
            className="w-72 border bg-[#EDCBFD] p-2 font-sans"
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
