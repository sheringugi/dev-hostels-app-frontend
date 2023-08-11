import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
// import Access_Navbar from "./Access_Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const foundUser = JSON.parse(storedUser);
      setLoggedInUser(foundUser);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://dev-hostels-app.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, errors }),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          const e = await res.json();
          return await Promise.reject(e);
        }
      })
      .then((data) => {
        sessionStorage.setItem("user", JSON.stringify(data));
        setLoggedInUser(data);
        setEmail("");
        setPassword("");
        setErrors([]);
        window.location.href = "/protected"
      })
      .catch((error) => {
        setErrors(error.errors);
      });
  }

  const handleCheckboxChange = (e) => {
    setShowPassword(e.target.checked);
  };

  return (
    <>
      {/* <Access_Navbar /> */}
      <div className="login-page">
        {/* {loggedInUser ? (
          <div className="logged-in-container">
            <h1>Welcome, {loggedInUser.first_name}!</h1>
            <Link to="/protected">
              <button>procced</button>
            </Link>
          </div>
        ) : ( */}
          <div className="login-container">
            <div className="login-information">
              <p>Find your new home today, tomorrow or by location</p>
              <div className="background-circle">
                <img
                  className="apartment-image"
                  src="https://images.unsplash.com/photo-1580216643062-cf460548a66a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60"
                  alt="apartment"
                />
              </div>
            </div>

            <div className="login-form-container">
              <h1>
              <img
                src="/public/assets/226-2265935_clipart-home-home-address-small-blue-house-logo.png"
                alt="House Logo"
                className="house-logo"
              />
                Hostels
                </h1>
              <h2>Login</h2>
              <p>Find your Dream Hostel</p>
              <form onSubmit={handleSubmit} autoComplete="on">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="login-input"
                    id="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="login-input"
                      id="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="show-password-toggle"
                        checked={showPassword}
                        onChange={handleCheckboxChange}
                      />
                      Show Password
                    </label>
                  </div>
                  <p className="forgot-password">
                    <a href="/reset-pass">Forgot Password?</a>
                  </p>
                </div>
                <div className="login-form-buttons">
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                  <button className="login-with-google">
                    Sign-in with Google
                  </button>
                </div>

                <p className="dont-have-an-account">
                  Don't have an account? <a href="/signup">Create Account</a>
                </p>
                <div className="error-message">
                  {errors.map((e, index) => (
                    <p key={index}>{e}</p>
                  ))}
                </div>
              </form>
            </div>
          </div>
        {/* )} */}
      </div>
    </>
  );
}

export default Login;