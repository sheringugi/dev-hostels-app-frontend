import React, { useState, useEffect } from "react";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBed } from "@fortawesome/free-solid-svg-icons";
import FilterByLocation from "./FilterByLocation";
import FilterByRoom from "./FilterByRoom";
import "./Hostel_listing.css";
import { Link } from "react-router-dom";

function HostelListing() {
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("all"); 
  const [selectedRoomType, setSelectedRoomType] = useState("all");

  useEffect(() => {
    fetchHostels();
  }, []);

  useEffect(() => {
    filterHostels();
  }, [selectedRoomType, hostels ,selectedLocation]);

  const fetchHostels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hostels");
      setHostels(response.data);
    } catch (error) {
      console.error("Error fetching hostels:", error);
    }
  };

  const filterHostels = () => {
    console.log (selectedRoomType)
    if (selectedRoomType === "all" && selectedLocation === "all") {
      setFilteredHostels(hostels);
    } else {
      const filteredHostels = hostels.filter((hostel) => {
        const roomTypeCondition = selectedRoomType === "all" || hostel.room_type.includes(selectedRoomType);
        const locationCondition = selectedLocation === "all" || hostel.location === selectedLocation;
        return roomTypeCondition && locationCondition;
      });
      setFilteredHostels(filteredHostels);
    }
  };
  

  const handleRoomClick = (roomType) => {
    setSelectedRoomType(roomType);
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const roomTypes = ["all", "private", "single", "double", "two-sharing", "four-sharing"];
  // const roomTypeIcons = {
  //   private: faBed,
  //   single: faBed,
  //   double: faBed,
  //   "two-sharing": faBed,
  //   "four-sharing": faBed,
  // };
  const locations = ["all", "place", "location2", "location3"];


  return (
    <div className="hostel-listing">
      <h1>Hostel Listing</h1>
      {/* <button className="filter-button active"><img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/bed-room-4051521-3346594.png?f=avif&w=256" alt="Image" style="width: 32px; height: 32px;"/>Private</button> 
      <button className="filter-button active"><img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/bed-room-5837515-4918978.png?f=avif&w=256" alt="Image" style="width: 32px; height: 32px;"/>Single</button>
      <button className="filter-button active"><img src="https://cdn.iconscout.com/icon/free/png-512/free-two-separate-beds-1900673-1608793.png?f=avif&w=256" alt="Image" style="width: 32px; height: 32px;"/>Double</button>
      <button className="filter-button active"><img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/bunk-bed-34-727277.png?f=avif&w=256" alt="Image" style="width: 32px; height: 32px;"/>Two-sharing</button>
      <button className="filter-button active"><img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/capsule-hotel-8489253-6998791.png?f=avif&w=256" alt="Image" style="width: 32px; height: 32px;"/>Four-sharing</button> */}
      <FilterByRoom
        roomTypes={roomTypes}
        selectedRoomType={selectedRoomType}
        onRoomClick={handleRoomClick}
      />
      <FilterByLocation
        locations={locations}
        selectedLocation={selectedLocation}
        onLocationClick={handleLocationClick}
      />
      <div className="hostel-cards">
        {filteredHostels.map((hostel) => (
          <div key={hostel.id} className="hostel-card">
            <div className="content">
              <img src={hostel.image_url}/>
              <p>
                <span></span>
                {hostel.address}
              </p>
              <Link to={`/protected/hostelcard/${hostel.id}`}>View Details</Link>
              </div>
        
          </div>
         ))}
      </div>

  </div>  
  );
}

export default HostelListing;
