import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Landing from "./Landing";
import Home from "./Home"

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    // Perform login logic here, and after successful login, set isLoggedIn to true
    setIsLoggedIn(true);
    // Redirect the user to the protected route
    return <Navigate to="/protected" replace />;
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      {/* If the user is already logged in, redirect to /protected */}
      {isLoggedIn && <Navigate to="/protected" replace />}
      {/* Define your protected route(s) here */}
      <Route path="/protected" element={<Home />} />
      <Route path="/protected/logout" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
