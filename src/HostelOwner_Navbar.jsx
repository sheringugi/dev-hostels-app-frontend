import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "./HostelOwner_Navbar.css"

function HostelOwner_Navbar() {
  return (
    <nav className="hostel-owner-navbar">
      <h1 className="navbar-left-ho">
        <Link to="/protected">Dev~Hostels</Link>
      </h1>
      <ul className="navbar-right-ho">
        <li className="navbar-hostels">
          <Link to="/protected/hostel-listing">Back to Hostels</Link>
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
export default HostelOwner_Navbar
