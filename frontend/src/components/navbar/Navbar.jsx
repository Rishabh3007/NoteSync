import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink class="navbar-brand" to="/">
          Navbar
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item active">
              <NavLink class="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li class="nav-item active">
              <NavLink class="nav-link" to="/register">
                Register
              </NavLink>
            </li>
            <li class="nav-item active">
              <NavLink class="nav-link" to="/signin">
                Sign-In
              </NavLink>
            </li>
            
          </ul>
        </div>
      </nav>
    </div>
  );
};
