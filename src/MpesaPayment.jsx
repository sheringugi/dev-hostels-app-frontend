// MpesaPayment.js
import React, { useState } from 'react';

const MpesaPayment = ({ totalPrice, onPaymentSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePay = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          amount: totalPrice.toString(),
        }),
      });

      if (response.ok) {
        onPaymentSuccess(); // Notify parent component of successful payment
      } else {
        console.error('Payment failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>M-Pesa Payment</h2>
      <p>Total Amount: ${totalPrice}</p>
      <label>
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>
      <button onClick={handlePay}>Pay</button>
    </div>
  );
};

export default MpesaPayment;
