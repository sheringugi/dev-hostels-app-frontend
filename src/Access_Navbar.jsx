import React from "react";
import { Link } from "react-router-dom";
import "./Access_Navbar.css";

function Access_Navbar() {
  return (
    <nav className="access-navbar">
      <h1 className="access-navbar-left">Dev~Hostels</h1>
      <ul className="access-navbar-right">
        <li className="access-navbar-hostels">
          <Link to="/signup">Signup</Link>
        </li>
        <li className="user-profile">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Access_Navbar;
