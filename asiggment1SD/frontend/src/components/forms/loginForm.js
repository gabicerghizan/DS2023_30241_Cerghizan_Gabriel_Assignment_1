import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthService, { refreshPage } from "../../services/AuthService";

function LoginForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function handleRegister() {
    navigate("/register");
  }

  const onSubmit = (data) => {
    const credentials = {
      username: data.username,
      password: data.password,
    };

    AuthService.login(credentials)
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("roles", AuthService.getCurrentUserRoles());

        navigate("/");
        refreshPage();
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          console.log("Unauthorized");
        }
      });
  };

  return (
    <div className="mx-auto my-36 flex h-[350px] w-[350px] flex-col border-2 bg-white text-black shadow-xl">
      <div className="mx-8 mt-7 mb-1 flex flex-row justify-start space-x-2">
        <div className="h-7 w-3 bg-[#0DE6AC]"></div>
        <div className="w-3 text-center font-sans text-xl font-bold">
          <h1>Login</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          <input
            className="my-2 w-72 border p-2"
            placeholder="Username"
            {...register("username")}
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
            className="w-72 border bg-[#0DE6AC] p-2 font-sans"
            type="submit"
          >
            Login
          </button>
        </div>
        <div className="my-2 flex justify-center">
          <button
            className="w-72 border bg-[#EDCBFD] p-2 font-sans"
            type="submit"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
