import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Landing from "./Landing";
import Home from "./Home";
import PasswordReset from "./Password_reset";
import HostelCard from "./HostelCard";
import HostelListing from "./Hostel_listing";
import Hostel_owner from "./Hostel_owner";
import Logout from "./Logout";
import ImageUploadForm from "./Image";
import User from "./User";
import SurveyStep1 from "./Survey_step1";
// import ContactsUs from "./ContactUs"
function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
    return <Navigate to="/protected" replace />;
  };
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      {isLoggedIn && <Navigate to="/protected" replace />}
      <Route
        path="/reset-pass"
        element={<PasswordReset handleLogin={handleLogin} />}
      />
      {isLoggedIn && <Navigate to="/protected" replace />}
      <Route path="/protected" element={<Home />} />
      <Route path="/protected/hostel-listing" element={<HostelListing />} />
      <Route path="protected/hostelcard/:hostelId" element={<HostelCard />} />
      <Route path="/protected/image" element={<ImageUploadForm />} />
      <Route path="protected/hosting" element={<Hostel_owner />} />
      <Route path="/protected/user-profile" element={<User />} />
      <Route path="/protected/logout" element={<Logout to="/" replace />} />
      <Route path="/protected/survey-step1" element={<SurveyStep1 />} />
      {/* <Route path="/contacts" element={<ContactsUs />} /> */}
    </Routes>
  );
}
export default AppRoutes;