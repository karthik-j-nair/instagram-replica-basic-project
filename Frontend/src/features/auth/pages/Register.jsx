import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(e) {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data);
        setUsername("");
        setEmail("");
        setPassword("");
      });
  }

  return (
    <main>
      <div className="form-container">
        <h2>Register</h2>
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
            value={email}
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            placeholder="Enter your email"
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
          <button>Register</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="toggleAuthForm" to={"/login"}>
            Login
          </Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Register;
