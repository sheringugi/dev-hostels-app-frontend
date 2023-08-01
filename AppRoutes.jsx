import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Landing from "./Landing";

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  //   const handleLogout = () => {
  //     setIsLoggedIn(false);
  //   };
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      {isLoggedIn ? (
        <Route path="/protected/*" element={<Home />}>
          
        </Route>
      ) : (
        <Route path="/protected/*" element={<Navigate to="/login" replace />} />
      )}
      <Route path="/protected/logout" element={<Navigate to="/" replace />} />

      


    </Routes>
  );
}
export default AppRoutes;
 