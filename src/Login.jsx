import React, { useState, useEffect } from "react";
import "./Login.css";
// import { GoogleButton } from "./Gogglebutton";
// import HostelListing from "./Hostel_listing";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Check if there's a logged-in user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const foundUser = JSON.parse(storedUser);
      setLoggedInUser(foundUser);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, errors }),
      // credentials: "include", // Include credentials (cookies) with the request
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
        // Store the user data in localStorage
        localStorage.setItem("user", JSON.stringify(data));
        setLoggedInUser(data);
        setEmail("");
        setPassword("");
        setErrors([]);
      })
      .catch((error) => {
        setErrors(error.errors);
      });
  }

  const handleCheckboxChange = (e) => {
    setShowPassword(e.target.checked);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setEmail("");
    setPassword("");
    localStorage.removeItem("user");
  };

  return (
    <div className="login-page">
      {loggedInUser ? (
        <div className="logged-in-container">
          <h1>Welcome, {loggedInUser.first_name}!</h1>
          <button onClick={handleLogout}>Logout</button>
          {/* <HostelListing /> */}
        </div>
      ) : (
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
            <h1>Hostels</h1>
            <p>Find your Dream Hostel</p>
            <h2>Login</h2>

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
                {/* <GoogleButton
                  className="google-button-instance"
                  iconfinderGoogle="image.png"
                  iconfinderGoogleClassName="google-button-2"
                  signInWithGoogleClassName="design-component-instance-node"
                /> */}
              </div>

              <p className="dont-have-an-account">
                Don't have an account? <a href="/signup">Create Account</a>
              </p>
              {/* <div className="error-message">
                {errors.map((e, index) => (
                  <p key={index}>{e}</p>
                ))}
              </div> */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from 'js-cookie'
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   // Check if there's a logged-in user on component mount
//   useEffect(() => {
//     const storedToken = sessionStorage.getItem("session_id");
//     if (storedToken) {
//       // You might want to validate the token with the server to ensure it's still valid
//       setLoggedInUser({ token: storedToken });
//     }
//   }, []);

//   function handleSubmit(e) {
//     e.preventDefault();
//     const user = { email, password };

//     axios
//       .post("http://localhost:3000/login", user)
//       .then((response) => {
//         const { token } = response.data; // Make sure the token is coming from the backend
//         sessionStorage.setItem("session_id", token);
//         setLoggedInUser({ token });
//         setEmail("");
//         setPassword("");
//         setErrors([]);
//       })
//       .catch((error) => {
//         setErrors(["Invalid credentials. Please try again."]);
//       });
//   }

//   const handleCheckboxChange = (e) => {
//     setShowPassword(e.target.checked);
//   };

//   const handleLogout = () => {
//     // Clear the token from session storage and reset the user state
//     sessionStorage.removeItem("session_id");
//     setLoggedInUser(null);
//   };

//   return (
//     <div className="login-page">
//       {loggedInUser ? (
//         <div className="logged-in-container">
//           <h1>Welcome, {loggedInUser.first_name}</h1>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <div className="login-container">
//           <div className="login-information">
//             <p>Find your new home today, tomorrow or by location</p>
//             <div className="background-circle">
//               <img
//                 className="apartment-image"
//                 src="https://images.unsplash.com/photo-1580216643062-cf460548a66a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60"
//                 alt="apartment"
//               />
//             </div>
//           </div>

//           <div className="login-form-container">
//             <h1>Hostels</h1>
//             <h2>Login</h2>
//             <p>Find your Dream Hostel</p>
//             <form onSubmit={handleSubmit} autoComplete="on">
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   className="login-input"
//                   id="email"
//                   placeholder="Enter your Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   autoComplete="email"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <div className="password-input-container">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     className="login-input"
//                     id="password"
//                     placeholder="Enter Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     autoComplete="current-password"
//                     required
//                   />
//                   <label className="checkbox-label">
//                     <input
//                       type="checkbox"
//                       className="show-password-toggle"
//                       checked={showPassword}
//                       onChange={handleCheckboxChange}
//                     />
//                     Show Password
//                   </label>
//                 </div>
//                 <p className="forgot-password">
//                   <a href="/reset-pass">Forgot Password?</a>
//                 </p>
//               </div>
//               <div className="login-form-buttons">
//                 <button type="submit" className="login-btn">
//                   Login
//                 </button>
//                 <button className="login-with-google">
//                   Sign-in with Google
//                 </button>
//               </div>

//               <p className="dont-have-an-account">
//                 Don't have an account? <a href="/signup">Create Account</a>
//               </p>
//               <div className="error-message">
//                 {errors.map((e, index) => (
//                   <p key={index}>{e}</p>
//                 ))}
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Login;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   // Check if there's a logged-in user on component mount
//   useEffect(() => {
//     const storedToken = Cookies.get("session_id");
//     if (storedToken) {
//       // You might want to validate the token with the server to ensure it's still valid
//       setLoggedInUser({ token: storedToken });
//     }
//   }, []);

//   function handleSubmit(e) {
//     e.preventDefault();
//     const user = { email, password };

//     axios
//       .post("http://localhost:3000/login", user)
//       .then((response) => {
//         const { token } = response.data; // Make sure the token is coming from the backend
//         // Set the cookie to expire in 1 day
//         Cookies.set("session_id", token, { expires: 1 });
//         setLoggedInUser({ token });
//         setEmail("");
//         setPassword("");
//         setErrors([]);
//       })
//       .catch((error) => {
//         setErrors(["Invalid credentials. Please try again."]);
//       });
//   }

//   const handleCheckboxChange = (e) => {
//     setShowPassword(e.target.checked);
//   };

//   const handleLogout = () => {
//     // Clear the token cookie and reset the user state
//     Cookies.remove("session_id");
//     setLoggedInUser(null);
//   };

//   return (
//     <div className="login-page">
//       {loggedInUser ? (
//         <div className="logged-in-container">
//           <h1>Welcome, {loggedInUser.email}!</h1>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <div className="login-container">
//           <div className="login-information">
//             <p>Find your new home today, tomorrow or by location</p>
//             <div className="background-circle">
//               <img
//                 className="apartment-image"
//                 src="https://images.unsplash.com/photo-1580216643062-cf460548a66a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60"
//                 alt="apartment"
//               />
//             </div>
//           </div>

//           <div className="login-form-container">
//             <h1>Hostels</h1>
//             <h2>Login</h2>
//             <p>Find your Dream Hostel</p>
//             <form onSubmit={handleSubmit} autoComplete="on">
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   className="login-input"
//                   id="email"
//                   placeholder="Enter your Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   autoComplete="email"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <div className="password-input-container">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     className="login-input"
//                     id="password"
//                     placeholder="Enter Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     autoComplete="current-password"
//                     required
//                   />
//                   <label className="checkbox-label">
//                     <input
//                       type="checkbox"
//                       className="show-password-toggle"
//                       checked={showPassword}
//                       onChange={handleCheckboxChange}
//                     />
//                     Show Password
//                   </label>
//                 </div>
//                 <p className="forgot-password">
//                   <a href="/reset-pass">Forgot Password?</a>
//                 </p>
//               </div>
//               <div className="login-form-buttons">
//                 <button type="submit" className="login-btn">
//                   Login
//                 </button>
//                 <button className="login-with-google">
//                   Sign-in with Google
//                 </button>
//               </div>

//               <p className="dont-have-an-account">
//                 Don't have an account? <a href="/signup">Create Account</a>
//               </p>
//               <div className="error-message">
//                 {errors.map((e, index) => (
//                   <p key={index}>{e}</p>
//                 ))}
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Login;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Login.css";

// const axiosWithCredentials = axios.create({
//   withCredentials: true,
//   baseURL: "http://localhost:3000", // Replace with your backend URL
// });

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   useEffect(() => {
//     const storedToken = sessionStorage.getItem("session_id");
//     if (storedToken) {
//       // You might want to validate the token with the server to ensure it's still valid
//       setLoggedInUser({ token: storedToken });
//     }
//   }, []);

//   function handleSubmit(e) {
//     e.preventDefault();
//     const user = { email, password };

//     axiosWithCredentials
//       .post("/login", user)
//       .then((response) => {
//         const { token } = response.data; // Make sure the token is coming from the backend
//         sessionStorage.setItem("session_id", token);
//         setLoggedInUser({ token });
//         setEmail("");
//         setPassword("");
//         setErrors([]);
//       })
//       .catch((error) => {
//         setErrors(["Invalid credentials. Please try again."]);
//       });
//   }

//   const handleCheckboxChange = (e) => {
//     setShowPassword(e.target.checked);
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("session_id");
//     setLoggedInUser(null);
//   };

//   return (
//     <div className="login-page">
//       {loggedInUser ? (
//         <div className="logged-in-container">
//           <h1>Welcome, {loggedInUser.first_name}!</h1>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <div className="login-container">
//           <div className="login-information">
//             <p>Find your new home today, tomorrow or by location</p>
//             <div className="background-circle">
//               <img
//                 className="apartment-image"
//                 src="https://images.unsplash.com/photo-1580216643062-cf460548a66a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60"
//                 alt="apartment"
//               />
//             </div>
//           </div>

//           <div className="login-form-container">
//             <h1>Hostels</h1>
//             <h2>Login</h2>
//             <p>Find your Dream Hostel</p>
//             <form onSubmit={handleSubmit} autoComplete="on">
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   className="login-input"
//                   id="email"
//                   placeholder="Enter your Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   autoComplete="email"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <div className="password-input-container">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     className="login-input"
//                     id="password"
//                     placeholder="Enter Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     autoComplete="current-password"
//                     required
//                   />
//                   <label className="checkbox-label">
//                     <input
//                       type="checkbox"
//                       className="show-password-toggle"
//                       checked={showPassword}
//                       onChange={handleCheckboxChange}
//                     />
//                     Show Password
//                   </label>
//                 </div>
//                 <p className="forgot-password">
//                   <a href="/reset-pass">Forgot Password?</a>
//                 </p>
//               </div>
//               <div className="login-form-buttons">
//                 <button type="submit" className="login-btn">
//                   Login
//                 </button>
//                 <button className="login-with-google">Sign-in with Google</button>
//               </div>

//               <p className="dont-have-an-account">
//                 Don't have an account? <a href="/signup">Create Account</a>
//               </p>
//               <div className="error-message">
//                 {errors.map((e, index) => (
//                   <p key={index}>{e}</p>
//                 ))}
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);

//   function handleSubmit(e) {
//     e.preventDefault();
//     const user = { email, password };

//     axios
//       .post("http://localhost:3000/login", user, { withCredentials: true })
//       .then((response) => {
//         const loggedInUser = response.data;
//         // You can handle the logged-in user data here
//         console.log("Logged in user:", loggedInUser);
//         setEmail("");
//         setPassword("");
//         setErrors([]);
//       })
//       .catch((error) => {
//         setErrors(["Invalid credentials. Please try again."]);
//       });
//   }

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="login-information">
//           <p>Find your new home today, tomorrow or by location</p>
//           <div className="background-circle">
//             <img
//               className="apartment-image"
//               src="https://images.unsplash.com/photo-1580216643062-cf460548a66a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60"
//               alt="apartment"
//             />
//           </div>
//         </div>

//         <div className="login-form-container">
//           <h1>Hostels</h1>
//           <h2>Login</h2>
//           <p>Find your Dream Hostel</p>
//           <form onSubmit={handleSubmit} autoComplete="on">
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 className="login-input"
//                 id="email"
//                 placeholder="Enter your Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 autoComplete="email"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <div className="password-input-container">
//                 <input
//                   type="password"
//                   className="login-input"
//                   id="password"
//                   placeholder="Enter Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   autoComplete="current-password"
//                   required
//                 />
//               </div>
//               <p className="forgot-password">
//                 <a href="/reset-pass">Forgot Password?</a>
//               </p>
//             </div>
//             <div className="login-form-buttons">
//               <button type="submit" className="login-btn">
//                 Login
//               </button>
//               <button className="login-with-google">Sign-in with Google</button>
//             </div>

//             <p className="dont-have-an-account">
//               Don't have an account? <a href="/signup">Create Account</a>
//             </p>
//             <div className="error-message">
//               {errors.map((e, index) => (
//                 <p key={index}>{e}</p>
//               ))}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
