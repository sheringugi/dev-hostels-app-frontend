import React, { useState, useEffect } from "react";
import axios from "axios";
// import FilterByLocation from "./FilterByLocation";
import FilterByRoom from "./FilterByRoom";
import "./Hostel_listing.css";
import { Link } from "react-router-dom";
import ProtectedNavBar from "./ProtectedNavBar";

function HostelListing() {
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  // const [selectedLocation, setSelectedLocation] = useState("all");
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
      const filteredHostels = hostels.filter((hostel) => {
        const roomTypeCondition =
          selectedRoomType === "all" || hostel.room_type.includes(selectedRoomType);
        return roomTypeCondition;
      });
      setFilteredHostels(filteredHostels);
    }
  };

  const handleRoomClick = (roomType) => {
    setSelectedRoomType(roomType);
  };

  const roomTypes = ["all", "private", "single", "double", "two-sharing", "four-sharing"];
  const roomTypeIcons = {
    all: "https://cdn.iconscout.com/icon/premium/png-512-thumb/bed-1651049-1402458.png?f=avif&w=256",
    private: "https://cdn.iconscout.com/icon/premium/png-512-thumb/bed-room-4051521-3346594.png?f=avif&w=256",
    single: "https://cdn.iconscout.com/icon/premium/png-512-thumb/bed-room-5837515-4918978.png?f=avif&w=256",
    double: "https://cdn.iconscout.com/icon/free/png-512/free-two-separate-beds-1900673-1608793.png?f=avif&w=256",
    "two-sharing": "https://cdn.iconscout.com/icon/premium/png-512-thumb/bunk-bed-34-727277.png?f=avif&w=256",
    "four-sharing": "https://cdn.iconscout.com/icon/premium/png-512-thumb/capsule-hotel-1900704-1608819.png?f=avif&w=256",
  };

  return (
    <>
      <ProtectedNavBar />
      <div className="hostel-listing">
        <h1>Hostel Listing</h1>
        <div className="button-container">
          {roomTypes.map((roomType) => (
            <button
              key={roomType}
              className={`filter-button ${selectedRoomType === roomType ? "active" : ""}`}
              onClick={() => handleRoomClick(roomType)}
            >
              <img src={roomTypeIcons[roomType]} alt="Image" className="filter-icon" />
              <span>{roomType.charAt(0).toUpperCase() + roomType.slice(1)}</span>
            </button>
          ))}
        </div>
        {/* <FilterByRoom
          roomTypes={roomTypes}
          selectedRoomType={selectedRoomType}
          onRoomClick={handleRoomClick}
        /> */}
        {/* <FilterByLocation
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationClick={handleLocationClick}
        /> */}
        <div className="hostel-cards">
          {filteredHostels.map((hostel) => (
            <div key={hostel.id} className="hostel-card">
              <div className="content">
                <img src={hostel.image_url} alt="Hostel" />
                <p>
                  <span>Rating: {hostel.ratings}</span> {/* Display the rating here */}
                  {hostel.address}
                </p>
                <Link to={`/protected/hostelcard/${hostel.id}`}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HostelListing;
