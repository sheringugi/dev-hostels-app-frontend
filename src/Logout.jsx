import React from "react";
import { useNavigate } from "react-router-dom";
import Access_Navbar from "./Access_Navbar";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  
  return (
    <div>
      <Access_Navbar />
      <h1>Clicking this will log you out!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
