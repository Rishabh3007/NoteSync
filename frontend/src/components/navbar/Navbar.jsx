import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
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
      console.log(err);
    }
  };

  useEffect(() => {
    const callauth = async () => {
      await auth();
    };
    callauth();
    // eslint-disable-next-line 
  }, [, userLoggedIn]);
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
        setUserLoggedIn(false);
        navigate("/signin", { replace: true });
      } else {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          Navbar
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
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {userLoggedIn ? (
              <li>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={callLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/signin">
                    Sign-In
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
