import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Import the date picker styles
import "react-date-range/dist/theme/default.css"; // Import the default theme for the date picker
import "./ReservationForm.css";

const ReservationForm = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [pricePerDay, setPricePerDay] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
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
  }, [hostelId]);

  useEffect(() => {
    updateTotalPrice(selectedRange[0].startDate, selectedRange[0].endDate);
  }, [selectedRange]);

  const handleDateRangeChange = (ranges) => {
    setSelectedRange([ranges.selection]);
    setCheckInDate(ranges.selection.startDate);
    setCheckOutDate(ranges.selection.endDate);
  };

  const updateTotalPrice = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      const nights = differenceInDays(new Date(checkOut), new Date(checkIn));
      const totalPrice = nights * pricePerDay;
      setTotalPrice(totalPrice);
    } else {
      setTotalPrice(0);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
