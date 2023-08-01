import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
function Navbar() {
  return (
    <nav className="unprotected-navbar">
      <li className="navbar-li">
        <Link to="/">Landing</Link>
      </li>
      <li className="navbar-li">
        <Link to="/signup">Sign up</Link>
      </li>
      <li className="navbar-li">
        <Link to="/login">Login</Link>
      </li>
    </nav>
    
  );
}
export default Navbar;