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

  useEffect(() => {
    fetchHostels();
  }, []);

  useEffect(() => {
    filterHostels();
  }, [selectedRoomType, hostels]);

  const fetchHostels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hostels");
      setHostels(response.data);
    } catch (error) {
      console.error("Error fetching hostels:", error);
    }
  };

  const filterHostels = () => {
    if (selectedRoomType === "all") {
      setFilteredHostels(hostels);
    } else {
      const filteredHostels = hostels.filter((hostel) =>
        hostel.room_type.includes(selectedRoomType)
      );
      setFilteredHostels(filteredHostels);
    }
  };

  const handleRoomClick = (roomType) => {
    setSelectedRoomType(roomType);
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

  // Carousel settings
  const settings = {
    dots: true,
    // useKeyboardArrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <ProtectedNavBar />
      <div className="hostel-listing">
        <h1>Available Hostels</h1>
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
