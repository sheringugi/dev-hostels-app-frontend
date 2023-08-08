import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./HostelCard.css";
import ProtectedNavBar from "./ProtectedNavBar";
import ReservationForm from "./ReservationForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBed,
  faBath,
  faTv,
  faUtensils,
  faWifi,
  faAirFreshener,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

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
          <h2 className="address">
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ color: "#000000" }}
            />{" "}
            <i> </i>
            <i> </i>
            <span>{hostel.address}</span>
          </h2>{" "}
          <h2 className="heading">{hostel.room_type}</h2>
          <div className="image-reservation">
            <div className="image-container">
              <div className="image-1-div">
                <img src={hostel.image_url_1} alt="Hostel Image 1" />
              </div>
              <div className="image">
                <img src={hostel.image_url_2} alt="Hostel Image 2" />
              </div>
              <div className="image">
                <img src={hostel.image_url_3} alt="Hostel Image 3" />
              </div>
              <div className="image">
                <img src={hostel.image_url_4} alt="Hostel Image 4" />
              </div>
              <div className="image">
                <img src={hostel.image_url_5} alt="Hostel Image 5" />
              </div>
            </div>
            <div className="reservation">
              <ReservationForm />
            </div>
          </div>
          <div className="hostel-details-p">
            <div className="facilities-present">
              <h3 className="hostel-details-heading">
                This Hostel Has these Facilities
              </h3>
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
            </div>
            <div className="ammenities-div">
              <h3 className="ammenities-present">
                These are the amenities present
              </h3>
              <p>
                <span>Has TV: </span>
                {hostel.has_tv ? (
                  <FontAwesomeIcon icon={faTv} />
                ) : (
                  <span className="no-text">No TV</span>
                )}
              </p>
              <p>
                <span>Has Kitchen: </span>
                {hostel.has_kitchen ? (
                  <FontAwesomeIcon icon={faUtensils} />
                ) : (
                  <span className="no-text">No Kitchen</span>
                )}
              </p>
              <p>
                <span>Has Air Conditioner: </span>
                {hostel.has_air_conditioner ? (
                  <FontAwesomeIcon icon={faAirFreshener} />
                ) : (
                  <span className="no-text">No Air Conditioner</span>
                )}
              </p>
              <p>
                <span>Has Internet: </span>
                {hostel.has_internet ? (
                  <FontAwesomeIcon icon={faWifi} />
                ) : (
                  <span className="no-text">No Internet</span>
                )}
              </p>
              <p>
                <span>Has Study Room: </span>
                {hostel.has_study_room ? (
                  <FontAwesomeIcon icon={faBook} />
                ) : (
                  <span className="no-text">No Study Room</span>
                )}
              </p>
              <p>
                <span>Has Meals: </span>
                {hostel.has_meals ? (
                  <FontAwesomeIcon icon={faUtensils} />
                ) : (
                  <span className="no-text">No Meals</span>
                )}
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default HostelCard;
