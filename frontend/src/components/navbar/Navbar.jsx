import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const auth = async () => {
    try {
      const res = await fetch("/auth", {
        method: "GET",
        credentials: "include",
      });
      if (res.status === 200) {
        setUserLoggedIn(true);
      }
    } catch (err) {
      setUserLoggedIn(false);
      console.log(err);
    }
  };

  const callLogout = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status === 200) {
        window.location.href = "/signin";
      } else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <NavLink className="nav-brand" to="/">
          Note<span className="main-color">Sync</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
          <li className="nav-item">
              <NavLink className="navlink" to="/">
                Home
              </NavLink>
              </li>
            {userLoggedIn ? (
              <li className="nav-item">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={callLogout}
              >
                Logout
              </button>
            </li>
            ) : (
              <>
              <li className="nav-item ">
              <NavLink className="navlink" to="/register">
                Register
              </NavLink>
              </li>
              <li className="nav-item ">
              <NavLink className="navlink" to="/signin">
                Sign-In
              </NavLink>
              </li>
              </>
            )
            }
            

            
          </ul>
        </div>
      </nav>
    </div>
  );
};
