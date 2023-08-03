import React from "react";
import location from "../Assets/location.png";
import Explore  from "../Assets/Explore .png";
import Book  from "../Assets/Book .png";

const Work = () => {
  const workInfoData = [
    {
      image: location,
      title: "Choose Your Location",
      text: "Select your desired location within Kenya, whether it's near your university, college, or work location.",
    },
    {
      image: Explore ,
      title: "Explore Student-Friendly Hostels", 
      text: " Browse through our curated list of hostels designed for student needs, including shared rooms, study spaces, and essential amenities.",
    },
    {
      image: Book ,
      title: "Book with Confidence",
      text: "Once you've found the perfect match, secure your booking through our safe and reliable payment system.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading"></p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        Finding your ideal student hostel is quick 
        and straightforward with Dev Hostels.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
