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
import Slider from "react-slick"; // <-- Import the Slider component
import "slick-carousel/slick/slick.css"; // <-- Import the CSS for the slider
import "slick-carousel/slick/slick-theme.css"; // <-- Import the theme CSS for the slider

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
  // const imageUrls = JSON.parse(hostel.image_url);

  // Slider settings to display all images at once
  // const sliderSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };
  return (
    <>
      <ProtectedNavBar />
      <div key={hostel.id} className="hostel-details">
        <div className="hostel-content">
          <h2 className="address">
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ color: "#000000" }}
            />
            <span>{hostel.address}</span>
          </h2>{" "}
          <h2 className="heading">{hostel.room_type}</h2>
          {/* <div className="slider">
            <Slider {...sliderSettings}>
              {imageUrls.map((imageUrl, index) => (
                <div key={index} className="slider-image">
                  <img src={imageUrl} alt={`Hostel Image ${index}`} />
                </div>
              ))}
            </Slider>
          </div> */}
          <div className="image-container">
            <img src={hostel.image_url_1} />
            <img src={hostel.image_url_2} />
            <img src={hostel.image_url_3} />
            <img src={hostel.image_url_4} />
            <img src={hostel.image_url_5} />
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
                These are the ammenities present
              </h3>
              <p>
                <span>Has TV: </span>
                {hostel.has_tv ? <FontAwesomeIcon icon={faTv} /> : "No TV"}
              </p>
              <p>
                <span>Has Kitchen: </span>
                {hostel.has_kitchen ? (
                  <FontAwesomeIcon icon={faUtensils} />
                ) : (
                  "No Kitchen"
                )}
              </p>
              <p>
                <span>Has Air Conditioner: </span>
                {hostel.has_air_conditioner ? (
                  <FontAwesomeIcon icon={faAirFreshener} />
                ) : (
                  "No Air Conditioner"
                )}
              </p>
              <p>
                <span>Has Internet: </span>
                {hostel.has_internet ? (
                  <FontAwesomeIcon icon={faWifi} />
                ) : (
                  "No Internet"
                )}
              </p>
              <p>
                <span>Has Study Room: </span>
                {hostel.has_study_room ? (
                  <FontAwesomeIcon icon={faBook} />
                ) : (
                  "No Study Room"
                )}
              </p>
              <p>
                <span>Has Meals: </span>
                {hostel.has_meals ? (
                  <FontAwesomeIcon icon={faUtensils} />
                ) : (
                  "No Meals"
                )}
              </p>
            </div>
            {/* <p>
              <span>Price: </span>
              {hostel.price}
            </p> */}
            <div className="reservation">
              <ReservationForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HostelCard;
