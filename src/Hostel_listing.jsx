import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Hostel_listing.css";
import ProtectedNavBar from "./ProtectedNavBar";
import Slider from "react-slick"; // <-- Import the Slider component
import "slick-carousel/slick/slick.css"; // <-- Import the CSS for the carousel
import "slick-carousel/slick/slick-theme.css"; // <-- Import the theme CSS for the carousel

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
      // Fetch current user code...
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

    // Filter by selected room type
    if (selectedRoomType !== "all") {
      filteredHostels = filteredHostels.filter((hostel) =>
        hostel.room_type.includes(selectedRoomType)
      );
    }

    // Filter by search query
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


  const roomTypes = ["all", "private", "single", "double", "two-sharing", "four-sharing"];

  
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

  // Carousel settings
  const settings = {
    dots: true,
    // useKeyboardArrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const addToWishlist = (hostelId) => {
    try {
      console.log("Add to wishlist button clicked");
      console.log("Hostel ID:", hostelId);
      
      const existingWishlist = localStorage.getItem('wishlist') || '';
      const updatedWishlist = [...new Set(existingWishlist.split(',').filter(id => id !== '' && id !== hostelId)), hostelId];
      
      console.log("Updated Wishlist:", updatedWishlist);
      localStorage.setItem('wishlist', updatedWishlist.join(','));
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  // Removing from wishlist
  const removeFromWishlist = (hostelId) => {
    const updatedWishlist = (
      localStorage.getItem("wishlist") || ""
    )
      .split(",")
      .filter((id) => id.trim() !== "" && id !== hostelId)
      .join(",");
    localStorage.setItem("wishlist", updatedWishlist);
  
    // } catch (error) {
    //   console.error("Error removing from wishlist:", error);
    }
  
  

  
  

  return (
    <>
      <ProtectedNavBar />
      <div className="hostel-listing">
        <h1>Available Hostels</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Location..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
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
                {/* Add the Carousel component here */}
                <Slider {...settings}>
                  {/* {JSON.parse(hostel.image_url).map((url, index) => (
                      <div key={index}>
                        <img
                          src={url}
                          alt={`Hostel Image ${index + 1}`}
                          className="carousel-image"
                        />
                      </div>
                    ))} */}
                  <img src={hostel.image_url_1} />
                  <img src={hostel.image_url_2} />
                  <img src={hostel.image_url_3} />
                  <img src={hostel.image_url_4} />
                  <img src={hostel.image_url_5} />
                </Slider>

                <h2>
                  <b>{hostel.address}</b>
                </h2>
                <h2>
                  <span>
                    ${hostel.price_per_day} <b> Per day</b>{" "}
                  </span>
                </h2>
    
          <div>
          <button onClick={() => addToWishlist(hostel.id)}>
                Add to Wishlist
              </button>
              {/* Use the hostel.id as an argument when calling handleRemoveFromWishlist */}
              <button onClick={() => removeFromWishlist(hostel.id)}>
                Remove from Wishlist
              </button>
          </div>
                     <Link to={`/protected/hostelcard/${hostel.id}`}>
                  More Details
                </Link>
                <Link to="/protected/wishlist">View My Wishlist</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HostelListing;