import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Hostel_listing.css";

function HostelListing() {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hostels");
      setHostels(response.data);
    } catch (error) {
      console.error("Error fetching hostels:", error);
    }
  };

  return (
    <div className="hostel-listing">
      <h1>Hostel Listing</h1>
      <div className="hostel-cards">
        {hostels.map((hostel) => (
          <div key={hostel.id} className="hostel-card">
            <div className="content">
              <p className="heading">{hostel.room_type}</p>
              <p>Total Occupancy: {hostel.total_occupancy}</p>
              <p>
                <span>Total Bedrooms: </span>
                {hostel.total_bedrooms}
              </p>
              <p>
                <span>Total Bathrooms: </span>
                {hostel.total_bathrooms}
              </p>
              <p>
                <span>Total Beds: </span>
                {hostel.total_beds}
              </p>
              <p>
                <span>Summary: </span>
                {hostel.summary}
              </p>
              <p>
                <span>Address: </span>
                {hostel.address}
              </p>
              <p>
                <span>Has TV: </span>
                {hostel.has_tv ? "Yes" : "No"}
              </p>
              <p>
                <span>Has Kitchen: </span>
                {hostel.has_kitchen ? "Yes" : "No"}
              </p>
              <p>
                <span>Has Air Conditioner: </span>
                {hostel.has_air_conditioner ? "Yes" : "No"}
              </p>
              <p>
                <span>Has Internet: </span>
                {hostel.has_internet ? "Yes" : "No"}
              </p>
              <p>
                <span>Has Study Room: </span>
                {hostel.has_study_room ? "Yes" : "No"}
              </p>
              <p>
                <span>Has Meals: </span>
                {hostel.has_meals ? "Yes" : "No"}
              </p>
              <p>
                <span>Price: </span>
                {hostel.price}
              </p>
              <p>
                <span>Published At: </span>
                {hostel.published_at}
              </p>
              {/* <p>User ID: {hostel.user_id}</p> */}
              <p>
                <span>Latitude: </span>
                {hostel.latitude}
              </p>
              <p>
                <span>Longitude: </span>
                {hostel.longitude}
              </p>
              {/* <button className="btn">Read more</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HostelListing;
