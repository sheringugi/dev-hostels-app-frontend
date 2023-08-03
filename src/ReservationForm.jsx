import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { differenceInDays } from 'date-fns';
import "./ReservationForm.css"

const ReservationForm = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [pricePerDay, setPricePerDay] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const { hostelId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/hostels/${hostelId}/price_per_day`)
      .then((response) => {
        setPricePerDay(response.data.price_per_day || 0); // Set a default value in case the price is not available
      })
      .catch((error) => {
        console.error('Error fetching price per day:', error);
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
      const response = await axios.post('http://localhost:3000/reservations', {
        start_date: checkInDate,
        end_date: checkOutDate,
        price: pricePerDay,
        total: totalPrice,
        hostel_id: hostelId,
        // Other reservation details
      });

      console.log('Reservation created:', response.data);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error creating reservation:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
};

export default ReservationForm;
