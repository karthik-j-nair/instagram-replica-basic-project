import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { user, handleLogin, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }
  async function submitHandler(e) {
    e.preventDefault();

    await handleLogin(username, password).then((res) => {
      // console.log(res);
      navigate("/");
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
