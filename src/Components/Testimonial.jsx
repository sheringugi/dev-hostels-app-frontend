import React from "react";
import ProfilePic from "../Assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
        We take pride in delivering exceptional services
         to ensure every student's stay is rewarding and memorable.
        </p>
      </div>
      <div className="testimonial-section-bottom">
        <img src={ProfilePic} alt="" />
        <p>
        Dev Hostels made my student life in Nairobi so much better! The hostels 
        I found through their platform were not only budget-friendly but also located near my university.I highly recommend Dev
         Hostels to anyone looking for convenient and student-friendly accommodations.
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>John M - University Student:</h2>
      </div>
    </div>
  );
};

export default Testimonial;
