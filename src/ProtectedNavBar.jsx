import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "./ProtectedNavBar.css";
import axios from "axios";

function ProtectedNavBar() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const handleImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();

    if (!selectedImage) {
      console.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_image", selectedImage);

    const updateImageUrl = `http://localhost:3000/updateimage/${user.user.id}`;

    axios
      .patch(updateImageUrl, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        const updatedUser = { ...user };
        updatedUser.user.profile_image = data.profile_image;
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  return (
    <nav className="protected-navbar">
      <h1 className="navbar-left">
        <Link to="/protected">Dev~Hostels</Link>
      </h1>
      <ul className="navbar-right">
        <li>
          <Link to="/protected/hosting">Switch to hosting</Link>
        </li>
        <li className="navbar-hostels">
          <Link to="/protected/hostel-listing">Hostels</Link>
        </li>
        <li className="navbar-hostels">
          <Link to="/protected/wishlist">Wishlist</Link>
        </li>
        {/* <li className="navbar-hostels">
          <Link to="/protected/chat">Chat</Link>
        </li> */}
        <button className="p-navbar-li-logout" onClick={handleLogout}>
          <Link to="/protected/logout">Logout</Link>
        </button>
        <li className="user-profile">
        <form encType="multipart/form-data" onSubmit={handleUpload}>
          <label htmlFor="profileImage" className="image-upload-label">
            <img src={user?.user?.profile_image} alt="User Profile" />
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleImageSelect}
              style={{ display: "none" }}
            />
            <button type="submit"><span className="upload-icon">&#9998;</span>
            </button>
            
          </label>
          {/* <p>{user?.user?.first_name}</p> */}
          
        </form>
      </li>
      </ul>
    </nav>
  );
}

export default ProtectedNavBar;