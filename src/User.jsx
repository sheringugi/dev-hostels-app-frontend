import React, { useState, useEffect } from "react";
import "./User.css";
import ProtectedNavBar from "./ProtectedNavBar";

function User() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching user data...");
    fetch("https://dev-hostels-app.onrender.com/me")
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      // .then((res) => res.json())
      .then((data) => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

    const user = sessionStorage.getItem("user");
    let user1 = JSON.parse(user);

    // console.log("Fetched data:", user1);

    setUserData(user1);
    setLoading(false);
  }, []);

  return (
    <>
      <ProtectedNavBar />
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : userData ? (
          <div className="user-info">
            <h1>User information</h1>
            <p>Name: {userData.user["first_name"]}</p>
            <p>Email: {userData.user.email}</p>
            <img src={userData.user.profile_image}/>
          </div>
        ) : (
          <p>Error fetching user data.</p>
        )}
      </div>
    </>
  );
}

export default User;