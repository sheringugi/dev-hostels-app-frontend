import React, { useState, useEffect } from 'react';
import MpesaPayment from './MpesaPayment'; // Import the new component
import { Link } from 'react-router-dom'; 
import Reviews from './Reviews';
import "./ReservationForm.css";
import { useParams, useNavigate } from 'react-router-dom';

const ReservationForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [pricePerDay, setPricePerDay] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [showMpesaPayment, setShowMpesaPayment] = useState(false);

  const { hostelId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/hostels/${hostelId}/price_per_day`)
      .then((response) => response.json())
      .then((data) => {
        setPricePerDay(data.price_per_day || 0);
      })
      .catch((error) => {
        console.error('Error fetching price per day:', error);
      });

    fetch('http://localhost:3000/reviews')
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [hostelId]);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    updateTotalPrice(date, checkOutDate);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
    updateTotalPrice(checkInDate, date);
  };

  const getDateDifference = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
  };

  const updateTotalPrice = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const nights = getDateDifference(checkIn, checkOut);
      const totalPrice = nights * pricePerDay;
      setTotalPrice(totalPrice);
    } else {
      setTotalPrice(0);
    }
  };

  const handleReservationSubmit = (event) => {
    event.preventDefault();
    // Handle reservation submission logic
    // Redirect to M-Pesa payment page with the total price as a parameter
    navigate(`/protected/mpesa-payment/${totalPrice}`);  };

  return (
    <div>
      <form onSubmit={handleReservationSubmit}>
        <label>
          Check-in Date:
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => handleCheckInDateChange(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            max={checkOutDate || undefined}
          />
        </label>
        <label>
          Check-out Date:
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => handleCheckOutDateChange(e.target.value)}
            min={checkInDate || undefined}
          />
        </label>
        <p>Price Per Day: ${pricePerDay}</p>
        <p>Total Price: ${totalPrice}</p>
        <button type="submit">Create Reservation</button>
      </form>
      {/* <Link to={`/protected/mpesa-payment/${totalPrice}`}>Go to M-Pesa Payment</Link> */}
      {showMpesaPayment && <MpesaPayment totalPrice={totalPrice} onPaymentSuccess={() => setShowMpesaPayment(false)} />}
      <hr />
      <h2>Reviews:</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            Rating: {review.ratings} | Comment: {review.comments}
          </li>
        ))}
      </ul>
      <hr />
      <Reviews />
    </div>
  );
};

export default ReservationForm;
