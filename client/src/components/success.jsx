import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './success.css'; // Import CSS for styling

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Function to parse query parameters
    const getQueryParams = (search) => {
      return new URLSearchParams(search);
    };

    const queryParams = getQueryParams(location.search);
    const type = queryParams.get('type');

    // Redirect to the specified URL after 3 seconds
    const redirectTimer = setTimeout(() => {
      navigate(`/${type}`);
    }, 3000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(redirectTimer);
  }, [navigate, location.search]);

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
