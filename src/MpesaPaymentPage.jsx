import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import MpesaPayment from './MpesaPayment';

const MpesaPaymentPage = () => {
  const { totalPrice } = useParams();

  if (typeof totalPrice === 'undefined') {
    // Handle the case where totalPrice is not provided
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <h2>M-Pesa Payment</h2> */}
      <MpesaPayment totalPrice={parseInt(totalPrice)} />
    </div>
  );
};

// Define PropTypes for the component
MpesaPaymentPage.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

export default MpesaPaymentPage;
