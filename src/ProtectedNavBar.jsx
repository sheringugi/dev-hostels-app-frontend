import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "./ProtectedNavBar.css";

function ProtectedNavBar() {
  return (
    <nav className="protected-navbar">
      <h1 className="navbar-left">
        <Link to="/protected">Dev~Hostels</Link>
      </h1>
      <ul className="navbar-right">
        <li>
          <Link to="/protected/hosting">Switch to hosting</Link>
        </li>
        <li className="navbar-hostels">
          <Link to="/protected/hostel-listing">Hostels</Link>
        </li>
        <li className="navbar-hostels">
          <Link to="/protected/image">Image</Link>
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
          >
            Logout
          </Link>
        </li>
        <li className="user-profile">
          <Link to="/protected/user-profile">
            <FontAwesomeIcon icon={faCircleUser} size="2xl" className="" />{" "}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default ProtectedNavBar;
