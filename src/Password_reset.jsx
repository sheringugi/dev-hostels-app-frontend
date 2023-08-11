import React, { useState } from "react";
import "./Password_reset.css";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  function handleResetPassword(e) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    fetch("https://dev-hostels-app.onrender.com/changePass", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          setResetError("");
          setResetMessage("Password updated successfully!");
          window.location.href = "/protected";

          setTimeout(() => {
            setResetMessage("");
          }, 3000);

          setEmail("");
          setPassword("");
        } else {
          return res.json().then((data) => {
            setResetMessage("");
            setResetError(
              data.error || "Something went wrong. Please try again."
            );
          });
        }
      })
      .catch((error) => {
        setResetMessage("");
        setResetError("Something went wrong. Please try again.");
      });
  }

  const handleCheckboxChange = (e) => {
    setShowPassword(e.target.checked);
  };

  return (
    <div className="password-reset-container">
      <h2>Password Reset</h2>
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="reset-input"
            id="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              className="reset-input"
              id="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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
        </div>
        <div className="reset-form-buttons">
          <button type="submit" className="reset-btn">
            Reset Password
          </button>
        </div>
        <div className="reset-message">
          {resetMessage && <p className="reset-success">{resetMessage}</p>}
          {resetError && <p className="reset-error">{resetError}</p>}
        </div>
      </form>
    </div>
  );
}

export default PasswordReset;
