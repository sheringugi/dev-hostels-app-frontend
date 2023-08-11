import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Import the Slider component
import "slick-carousel/slick/slick.css"; // Import the CSS for the carousel
import "slick-carousel/slick/slick-theme.css"; // Import the theme CSS for the carousel
import ProtectedNavBar from "./ProtectedNavBar";
function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistHostels, setWishlistHostels] = useState([]);
  useEffect(() => {
    fetchWishlist();
  }, []);
  const fetchWishlist = () => {
    const wishlistIds = localStorage.getItem("wishlist") || "";
    setWishlist(wishlistIds.split(",").filter((id) => id !== ""));
  };
  useEffect(() => {
    fetchWishlistHostels();
  }, [wishlist]);
  const fetchWishlistHostels = async () => {
    try {
      const response = await axios.get("https://dev-hostels-app.onrender.com/hostels"); // Fetch all hostels
      const hostels = response.data;
      const wishlistHostels = hostels.filter((hostel) =>
        wishlist.includes(hostel.id.toString())
      );
      setWishlistHostels(wishlistHostels);
    } catch (error) {
      console.error("Error fetching wishlist hostels:", error);
    }
  };
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <ProtectedNavBar />
      <div className="wishlist">
        <h1>My Wishlist</h1>
        <div className="hostel-cards">
          {wishlistHostels.map((hostel) => (
            <div key={hostel.id} className="hostel-card">
              <div className="content">
                <Slider {...settings}>
                  {/* Add your images here */}
                  <img src={hostel.image_url_1} alt={`Image 1`} />
                  <img src={hostel.image_url_2} alt={`Image 2`} />
                  <img src={hostel.image_url_3} alt={`Image 3`} />
                  <img src={hostel.image_url_4} alt={`Image 4`} />
                  <img src={hostel.image_url_5} alt={`Image 5`} />

                  {/* Add more images as needed */}
                </Slider>
                <h2>
                  <b>{hostel.address}</b>
                </h2>
                <h2>
                  <span>
                    ${hostel.price_per_day} <b>Per day</b>
                  </span>
                </h2>
                <Link to={`/protected/hostelcard/${hostel.id}`}>
                  More Details
                </Link>
                <button
                  onClick={() => {
                    const updatedWishlist = wishlist.filter(
                      (id) => id !== hostel.id.toString()
                    );
                    localStorage.setItem("wishlist", updatedWishlist.join(","));
                    setWishlist(updatedWishlist);
                  }}
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Wishlist;
