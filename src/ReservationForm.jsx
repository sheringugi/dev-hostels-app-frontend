import React, { useState, useEffect } from 'react';
import MpesaPayment from './MpesaPayment'; // Import the new component
import { Link } from 'react-router-dom'; 
import Reviews from './Reviews';
import "./ReservationForm.css";
import { useParams, useNavigate } from 'react-router-dom';
// import { useParams } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Import the date picker styles
import "react-date-range/dist/theme/default.css"; // Import the default theme for the date picker


const ReservationForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [pricePerDay, setPricePerDay] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [showMpesaPayment, setShowMpesaPayment] = useState(false);
   const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { hostelId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/hostels/${hostelId}/price_per_day`)
      .then((response) => {
        setPricePerDay(response.data.price_per_day || 0);
      })
      .catch((error) => {
        console.error("Error fetching price per day:", error);
      });

    fetch('http://localhost:3000/reviews')
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [hostelId]);

  useEffect(() => {
    updateTotalPrice(selectedRange[0].startDate, selectedRange[0].endDate);
  }, [selectedRange]);

  const handleDateRangeChange = (ranges) => {
    setSelectedRange([ranges.selection]);
    setCheckInDate(ranges.selection.startDate);
    setCheckOutDate(ranges.selection.endDate);
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
    try {
      const response = await axios.post("http://localhost:3000/reservations", {
        start_date: selectedRange[0].startDate,
        end_date: selectedRange[0].endDate,
        price: pricePerDay,
        total: totalPrice,
        hostel_id: hostelId,
        // Other reservation details
      });

      console.log("Reservation created:", response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error creating reservation:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <div className="reservation-form-container">
        <h2 className="make-reservation">Make your Reservation Today!</h2>
        <form onSubmit={handleSubmit} className="reservation-form">
          <DateRangePicker
            onChange={handleDateRangeChange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            ranges={selectedRange}
            minDate={new Date()}
            months={3} // Show two months in the calendar
          />
          <div className="price-details">
            <p className="priced-details-p">Price Per Day: ${pricePerDay}</p>
            <p className="priced-details-p">Total Price: ${totalPrice}</p>
          </div>
          <button type="submit" className="button">
            Create Reservation
          </button>
        </form>
      </div>
    </>
  );
};

export default ReservationForm;
