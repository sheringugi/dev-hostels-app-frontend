import React from "react";
import "./Hostel_owner.css";
import { Link } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HostelOwner_Navbar from "./HostelOwner_Navbar";

function Hostel_owner() {
  return (
    <>
    <HostelOwner_Navbar />
      <div className="hostel-owner-page">
        <div className="hostel-owner-container">
          <div className="welcome-message-div">
            <h1 className="welcome-message">
              It's Easy to get started on Dev~Hostels
            </h1>
            <p>Host your place as a hostel with ease!</p>
          </div>
          <section className="hostel-owner-information">
            <div className="detailed-info-1">
              <h1>
                <span>1.</span> Tell us about your place
              </h1>
              <p>
                Share some basic info, like where it is and how many guests can
                stay.
              </p>
              <img
                src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg"
                alt="bed"
              />
            </div>
            <div className="detailed-info-2">
              <h1>
                <span>2.</span> Make it Stand out
              </h1>
              <p>
                Add 5 or more photos plus a title and description—we’ll help you
                out.
              </p>
              <img
                src="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg"
                alt="mirro"
              />
            </div>
            <div className="detailed-info-3">
              <h1>
                <span>3.</span> Finish up and publish
              </h1>
              <p>
                Choose if you'd like to start with an experienced guest, set a
                starting price, and publish your listing.
              </p>
              <img
                src="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg"
                alt="door"
              />
            </div>
            <div className="hosting-get-started">
              <Link to="/protected/survey-step1" >
                <button>
                  Get Started <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Hostel_owner;
