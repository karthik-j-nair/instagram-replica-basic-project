import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data);
        setUsername("");
        setPassword("");
      });
  }
  return (
    <main>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <input
            value={username}
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter your username"
          />
          <input
            value={password}
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <button>LOGIN</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="toggleAuthForm" to={"/register"}>
            Register
          </Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Login;
