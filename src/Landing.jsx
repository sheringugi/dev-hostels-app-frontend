import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Landing() {
  return (
    <>
      <div className="apartment-image-container">
        {/* Your image */}
        <img
          className="apartment-image"
          src="https://images.pexels.com/photos/9170356/pexels-photo-9170356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="apartment"
        />

        {/* h1 overlay */}
        <h1 className="h1-overlay">Welcome to Dev-Hostels!</h1>
      </div>

      
      {/* Buttons container */}
      <div className="get-started-buttons-container">
        <Link to="/signup">
          <button className="get-started">Get Started</button>
        </Link>
        <Link to="/login">
          <button className="get-started">Already have an Account</button>
        </Link>
      </div>
    </>
  );
}

export default Landing;
