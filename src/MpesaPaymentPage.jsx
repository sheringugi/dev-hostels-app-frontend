import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import MpesaPayment from './MpesaPayment';
import './MpesaPaymentPage.css';
import ProtectedNavBar from './ProtectedNavBar'; // Import your custom CSS file

const MpesaPaymentPage = () => {
  const { totalPrice } = useParams();

  if (typeof totalPrice === 'undefined') {
    // Handle the case where totalPrice is not provided
    return <div>Loading...</div>;
  }

  return (
    <>
      <ProtectedNavBar />
      <div className="payment-page-container">
        <div className="image-container">
          {/* Your image */}
          <img
            className="apartment-image"
            src="https://images.pexels.com/photos/9170356/pexels-photo-9170356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="apartment"
          />

          <div className="form-overlay">
            <div className="centered-form">
              <MpesaPayment totalPrice={parseInt(totalPrice)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Define PropTypes for the component
MpesaPaymentPage.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

export default MpesaPaymentPage;
