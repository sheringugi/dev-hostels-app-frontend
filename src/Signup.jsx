import React, { useState } from "react";
// import { useNavigate, useState } from "react-router-dom";
import "./Signup.css";
function Signup() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  //   const [username, setUsername] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTermsAndPrivacy, setAgreeToTermsAndPrivacy] = useState(false);
  //   const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone_number,
        // username,
        password,
        password_confirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(() => {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhoneNumber("");
          // setUsername("");
          setPassword("");
          setPasswordConfirmation("");
          setErrors([]);
          alert(`Account created successfully!`);
          //   navigate("/login");
        });
      } else {
        r.json().then((e) => setErrors(e.errors));
      }
    });
  }
  const handleCheckboxPasswordChange = (e) => {
    setShowPassword(e.target.checked);
  };
  const handleCheckboxPasswordConfirmChange = (e) => {
    setShowConfirmPassword(e.target.checked);
  };
  const handleCheckboxRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };
  const handleCheckboxTermsAndPrivacyChange = (event) => {
    setAgreeToTermsAndPrivacy(event.target.checked);
  };
  return (
    <>
      <div className="signup-page">
        <div className="signup-container">
          <div className="signup-information">
            <p>Find your new home today, tomorrow or by location</p>
            <div className="background-circle">
              <img
                className="apartment-image"
                src="https://images.unsplash.com/photo-1603294278610-b5bd0506303e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=985&q=80"
                alt="apartment"
              />
            </div>
          </div>
          <div className="signup-form-container">
            <h1>
              <img
                src="/public/assets/226-2265935_clipart-home-home-address-small-blue-house-logo.png"
                alt="House Logo"
                className="house-logo"
              />
              Hostels
            </h1>
            <p>Find your Dream Hostel</p>
            <h2>Create Account</h2>

            <form action="/signup" onSubmit={handleSubmit} autoComplete="on">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                value={first_name}
                placeholder="Enter Fist Name"
                id="first_name"
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="first_name"
                required
              />
              <label htmlFor="last_name">Last Name </label>
              <input
                type="text"
                value={last_name}
                placeholder="Enter Last Name"
                id="last_name"
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="last_name"
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                placeholder="Enter Your Email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="phone_number"
                value={phone_number}
                placeholder="Enter Your PhoneNumber"
                id="phone_number"
                onChange={(e) => setPhoneNumber(e.target.value)}
                autoComplete="phone_number"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter New Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <label className="signup-checkbox-label">
                <input
                  type="checkbox"
                  className="show-password-toggle"
                  checked={showPassword}
                  onChange={handleCheckboxPasswordChange}
                />
                Show Password
              </label>
              <label htmlFor="password-confirm">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                id="password-confirm"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="new-password"
                required
              />
              <label className="signup-checkbox-label">
                <input
                  type="checkbox"
                  className="show-password-toggle"
                  checked={showConfirmPassword}
                  onChange={handleCheckboxPasswordConfirmChange}
                />
                Show Password
              </label>
              <div>
                <p className="forgot-password">
                  <a href="/reset-pass">Forgot Password?</a>
                </p>
              </div>
              <label
                className="signup-checkbox-label"
                htmlFor="rememberMeCheckbox"
              >
                <input
                  type="checkbox"
                  className="remember-me-toggle"
                  id="rememberMeCheckbox"
                  checked={rememberMe}
                  onChange={handleCheckboxRememberMeChange}
                />
                Remember Me
              </label>
              <label
                className="signup-checkbox-label"
                htmlFor="IagreetoalltheTermsandPrivacypolicyCheckbox"
              >
                <input
                  type="checkbox"
                  className="IagreetoalltheTermsandPrivacypolicy"
                  id="IagreetoalltheTermsandPrivacypolicyCheckbox"
                  checked={agreeToTermsAndPrivacy}
                  onChange={handleCheckboxTermsAndPrivacyChange}
                />
                I agree to all the <a href="/terms">Terms</a>and
                <a href="/privacy-policy">Privacy Policy</a>
              </label>
              <div className="signup-form-buttons">
                <button type="submit" className="signup-btn">Create Account</button>
                <button className="signup-with-google">
                  Sign-in with Google
                </button>
              </div>
              <p className="you-have-an-account">
                You have an account? <a href="/login">Log In</a>
              </p>
              {/* <div style={{ color: "red", fontSize: "14px", padding: "10px" }}>
                {errors.map((e, index) => (
                  <p key={index}>{e}</p>
                ))}
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Signup;