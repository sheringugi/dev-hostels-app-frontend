import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./HostelCard.css";
import ProtectedNavBar from "./ProtectedNavBar";
import ReservationForm from "./ReservationForm";

function HostelCard() {
  const { hostelId } = useParams();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHostelDetails();
  }, []);

  const fetchHostelDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/hostels/${hostelId}`
      );
      console.log(hostelId);
      setHostel(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hostel details:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hostel) {
    return <div>Error: Hostel not found</div>;
  }

  return (
    <>
      <ProtectedNavBar />
      <div key={hostel.id} className="hostel-details">
        <div className="hostel-content">
          <div className="image-container">
            <img src={hostel.image_url} />
          </div>
          <p>
            <span></span>
            {hostel.address}
          </p>
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
          <p>User ID: {hostel.user_id}</p>
          <p>
            <span>Latitude: </span>
            {hostel.latitude}
          </p>
          <p>
            <span>Longitude: </span>
            {hostel.longitude}
          </p>
        </div>
        <ReservationForm />
      </div>
    </>
  );
}

export default HostelCard;
