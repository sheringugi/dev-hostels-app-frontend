import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Outlet, useLocation } from "react-router-dom";
import ProtectedNavBar from "./ProtectedNavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faDiscord,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const location = useLocation();

  const typingRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Welcome to Dev~hostels!",
        "Find your perfect hostel at the BEST prices.",
        "List your hostel with us and reach more travelers.",
        "Book your adventure now!",
      ],

      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    };

    typingRef.current = new Typed(".typing", options);

    return () => {
      typingRef.current.destroy();
    };
  }, []);
  return (
    <div>
      <ProtectedNavBar className="Dashboard" />
      <div className="dashboard-content">
        {location.pathname === "/protected" && (
          <>
            <div className="dashboard-container">
              <header className="home-header">
                <h1>
                  Introducing <strong>Dev~Hostels:</strong> Your Fast Track to
                  Hostel Bliss! ✨
                </h1>
                <h3>
                  <span className="typing"></span>
                </h3>
              </header>
              <div className="home-content">
                <div className="home-content-p">
                  Dev~Hostels: Your gateway to hostel bliss! Find your dream
                  accommodation effortlessly. List with us to reach global
                  travelers. Book now for unforgettable adventures! 🌍✨
                  <br />
                  <Link to="/protected/hostel-listing" className="explore-btn">
                    <button>
                      Explore{" "}
                      <FontAwesomeIcon
                        className="arrow-icon"
                        icon={faArrowRight}
                      />
                    </button>
                  </Link>
                </div>

                <video
                  // class="v6iu1id dir dir-ltr"
                  autoplay=""
                  crossorigin="anonymous"
                  playsinline=""
                  preload="auto"
                  // style="object-fit: cover;"
                >
                  <source src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high"></source>
                </video>
              </div>
            </div>
            <footer className="Home-footer">
              <div className="footer-content">
                <h3>Dev~Hostels</h3>
                <p className="footer-content-p">
                  "Travel is the only thing you can buy that makes you richer."
                  <br /> - Anonymous
                </p>
              </div>
              <div className="help-footer-links">
                <p>Help</p>
                <a href="/location">Location</a>
                <a href="/services">Services</a>
                <a href="/pricing">Pricing</a>
                <a href="/aboutus">About us</a>
                <a href="/contacts">Contact Us</a>
              </div>
              <div className="support-footer-links">
                <p>Support</p>
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/conditions">Terms and Contitions</a>
                <a href="/protected/hostel-listing">Hostels</a>
                <a href="https://github.com/sheringugi/dev-hostels-app-backend">
                  API
                </a>
              </div>{" "}
              <div className="social-icons">
                <h3>Find us on</h3>
                <div className="social-links">
                  <a href="https://www.facebook.com/login">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                  </a>
                  <a href="https://github.com/login">
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                  </a>
                  <a href="">
                    <FontAwesomeIcon icon={faDiscord} size="2x" />
                  </a>
                  <a href="">
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                  </a>
                </div>
              </div>
              <div className="made-with-love">
                <p>&copy; 2023 Dev_Hostels | All rights reserved.</p>
                <p>
                  made wtih love{" "}
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "#f01414" }}
                  />{" "}
                  by Group_1
                </p>
              </div>
            </footer>
          </>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
