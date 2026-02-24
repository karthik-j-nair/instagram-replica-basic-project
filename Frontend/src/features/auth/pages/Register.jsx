import React, { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { handleRegister, loading } = useAuth();

  async function submitHandler(e) {
    e.preventDefault();

    await handleRegister(username, email, password).then((res) => {
      // console.log(res);
      navigate("/");
    });
  }

  if(loading){
    return <h1>Loading...</h1>
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
