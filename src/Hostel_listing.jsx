import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Hostel_listing.css";
import ProtectedNavBar from "./ProtectedNavBar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LikeButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function HostelListing() {
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("all");
  const [currentUser, setCurrentUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    fetchHostels();
    fetchCurrentUser();
  }, []);
  useEffect(() => {
    filterHostels();
  }, [selectedRoomType, hostels, searchQuery]);
  const fetchCurrentUser = async () => {
    try {
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };
  const fetchHostels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hostels");
      setHostels(response.data);
    } catch (error) {
      console.error("Error fetching hostels:", error);
    }
  };
  const filterHostels = () => {
    let filteredHostels = hostels;
    if (selectedRoomType !== "all") {
      filteredHostels = filteredHostels.filter((hostel) =>
        hostel.room_type.includes(selectedRoomType)
      );
    }
    if (searchQuery.trim() !== "") {
      filteredHostels = filteredHostels.filter((hostel) =>
        hostel.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredHostels(filteredHostels);
  };
  const handleRoomClick = (roomType) => {
    setSelectedRoomType(roomType);
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const roomTypes = [
    "all",
    "private",
    "single",
    "double",
    "two-sharing",
    "four-sharing",
  ];
  const roomTypeIcons = {
    all: "https://cdn.iconscout.com/icon/premium/png-512-thumb/bed-1651049-1402458.png?f=avif&w=256",
    private:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/bed-room-4051521-3346594.png?f=avif&w=256",
    single:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/bed-room-5837515-4918978.png?f=avif&w=256",
    double:
      "https://cdn.iconscout.com/icon/free/png-512/free-two-separate-beds-1900673-1608793.png?f=avif&w=256",
    "two-sharing":
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/bunk-bed-34-727277.png?f=avif&w=256",
    "four-sharing":
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/capsule-hotel-1900704-1608819.png?f=avif&w=256",
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const addToWishlist = (hostelId) => {
    try {
      console.log("Add to wishlist button clicked");
      console.log("Hostel ID:", hostelId);
      const existingWishlist = localStorage.getItem("wishlist") || "";
      const updatedWishlist = [
        ...new Set(
          existingWishlist
            .split(",")
            .filter((id) => id !== "" && id !== hostelId)
        ),
        hostelId,
      ];
      console.log("Updated Wishlist:", updatedWishlist);
      localStorage.setItem("wishlist", updatedWishlist.join(","));
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  const removeFromWishlist = (hostelId) => {
    const updatedWishlist = (localStorage.getItem("wishlist") || "")
      .split(",")
      .filter((id) => id.trim() !== "" && id !== hostelId)
      .join(",");
    localStorage.setItem("wishlist", updatedWishlist);
    console.error("Error removing from wishlist:", error);
  };
  return (
    <>
      <ProtectedNavBar />
      <div className="hostel-listing">
        <div className="title-search-bar">
          <h1>Available Hostels</h1>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search by Location..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
        <div className="button-container">
          {roomTypes.map((roomType) => (
            <button
              key={roomType}
              className={`filter-button ${
                selectedRoomType === roomType ? "active" : ""
              }`}
              onClick={() => handleRoomClick(roomType)}
            >
              <img
                src={roomTypeIcons[roomType]}
                alt="Image"
                className="filter-icon"
              />
              <span>
                {roomType.charAt(0).toUpperCase() + roomType.slice(1)}
              </span>
            </button>
          ))}
        </div>
        <div className="hostel-cards">
          {filteredHostels.map((hostel) => (
            <div key={hostel.id} className="hostel-card">
              <div className="content">
                <Slider {...settings}>
                  <img src={hostel.image_url_1} />
                  <img src={hostel.image_url_2} />
                  <img src={hostel.image_url_3} />
                  <img src={hostel.image_url_4} />
                  <img src={hostel.image_url_5} />
                </Slider>
                <h2>
                  <b>{hostel.address}</b>
                </h2>
                <div className="wishlist-and-price">
                  <h2>
                    <span>
                      ${hostel.price_per_day} <b> Per day</b>{" "}
                    </span>
                  </h2>
                  <button onClick={() => addToWishlist(hostel.id)}>
                    {/* <FontAwesomeIcon icon={faStar} /> */}
                    <div title="Like" class="heart-container">
                      <input
                        id="Give-It-An-Id"
                        class="checkbox"
                        type="checkbox"
                      />
                      <div class="svg-container">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="svg-outline"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="svg-filled"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="100"
                          width="100"
                          class="svg-celebrate"
                        >
                          <polygon points="10,10 20,20"></polygon>
                          <polygon points="10,50 20,50"></polygon>
                          <polygon points="20,80 30,70"></polygon>
                          <polygon points="90,10 80,20"></polygon>
                          <polygon points="90,50 80,50"></polygon>
                          <polygon points="80,80 70,70"></polygon>
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>

                <Link to={`/protected/hostelcard/${hostel.id}`}>
                  More Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default HostelListing;
