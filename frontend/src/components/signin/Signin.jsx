import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid Signin");
      console.log("Invalid Signin");
    } else {
      window.alert("Signin Successful");
      console.log("Signin Successful");
      // navigate("/", {replace: true});
      window.location.href = "/";
    }
  };

  return (
    <div className="container">
      <form method="POST">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            placeholder="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
          ></input>
        </div>
        <div className="button-container">
          <button
            type="submit"
            name="signin"
            id="signin"
            className="auth-button"
            onClick={handleClick}
          >
            Sign In
          </button>
        </div>
      </form>
      <p className="redirect">
        Don't have an account? <NavLink to="/register">Register</NavLink>
      </p>
    </div>
  );
};

export default Signin;
