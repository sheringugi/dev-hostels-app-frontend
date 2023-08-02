import React from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
  
//   faHome,
  
// } from "@fortawesome/free-solid-svg-icons";

function ProtectedNavBar() {
  return (
    <nav className="protected-navbar">
      <ul className="navbar-ul">
        <li className="p-navbar-li">
          <Link to="/protected">
            Home
          </Link>
        </li>
        <li className="p-navbar-li-logout">
          <Link
            to="/protected/logout"
            onClick={(event) => {
              if (!window.confirm("Are you sure you want to log out?")) {
                event.preventDefault();
              } else {
              }
            }}
          >Logout
          </Link>
        </li>
             </ul>
    </nav>
  );
}

export default ProtectedNavBar;
