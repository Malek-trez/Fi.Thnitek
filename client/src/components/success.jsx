import React from 'react';
import './success.css'; // Import CSS for styling

const SuccessPage = () => {
  return (
    <div className="success-page">
      <div className="success-content">
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark-check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
        <div>
          <h2 className="success-heading">Payment Successful!</h2>
          <p className="success-text">
            Your payment has been successfully processed. Thank you for your
            purchase.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
