import React, { useState, useEffect } from 'react';

const MpesaPayment = ({ totalPrice }) => {
  const [countryCode, setCountryCode] = useState('254');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [queryStatus, setQueryStatus] = useState('');

  const [receipt, setReceipt] = useState([]);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const url = "https://4fc2-197-139-44-10.ngrok-free.app";

  const handlePay = async () => {
    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
  
      const response = await fetch(`${url}/stkpush`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: parseInt(fullPhoneNumber),
          amount: totalPrice.toString(),
        }),
      });
  
      if (response.ok) {
        setIsPaymentSuccessful(true);
        const data = await response.json();
        setReceipt(data);
        setPaymentStatus(data.ResponseDescription);
      } else {
        setPaymentStatus('Payment failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const checkPayment = async () => {
    try {
      if (receipt.length === 0 || !receipt[1]["CheckoutRequestID"]) {
        setQueryStatus('No receipt available');
        return;
      }
  
      const response = await fetch(`${url}/stkquery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkoutRequestID: receipt[1]["CheckoutRequestID"],
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        setQueryResult(result);
        setQueryStatus(result[1]["ResultCode"] === 0 ? 'Payment confirmed' : 'Payment was unsuccessful');
      } else {
        setQueryStatus('Query failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {
    if (isPaymentSuccessful) {
      const timer = setTimeout(() => {
        setIsPaymentSuccessful(false);
        setPaymentStatus('');
      }, 5000); // Clear the success message after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isPaymentSuccessful]);

  return (
    <div>
      <h2>M-Pesa Payment</h2>
      <p>Total Amount: ${totalPrice}</p>
      <label>
        Phone Number:
        <div>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="254">+254 (Kenya)</option>
            <option value="255">+255 (Tanzania)</option>
            <option value="256">+256 (Uganda)</option>
            {/* Add more country codes and names as needed */}
          </select>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </label>
      <button onClick={handlePay}>Pay</button>
      <p>{isPaymentSuccessful ? 'Payment successful' : paymentStatus}</p>
      {receipt.length > 0 && (
        <div>
          {/* <h3>Receipt:</h3> */}
          <p>{receipt[0]?.ResponseDescription}</p> {/* Display only the ResponseDescription */}
          <button onClick={checkPayment}>Check Payment Status</button>
          <p>{queryStatus}</p>
        </div>
      )}
    </div>
  );
};

export default MpesaPayment;
