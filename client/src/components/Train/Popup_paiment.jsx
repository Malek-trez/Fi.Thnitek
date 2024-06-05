import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../contexts/AccountContext'; // Adjust the import based on your project structure
import './Popup_paiment.css';

const PopupPaiment = ({ row, onClose, onBooking, Date }) => {
  const { user } = useContext(AccountContext); // Access user data from context
  const [reservationCount, setReservationCount] = useState(1);
  const navigate = useNavigate();

  const handleBookingClick = async () => {
    if (!user || !user.token) {
      navigate('/login');
      return;
    }

    try {
      onBooking(row, reservationCount);
      onClose();
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage or another appropriate source

      const paymentData = {
        type: 'train',
        amount: 40 * reservationCount, // Using the hard-coded price from Train.jsx
        name: `Train from ${row.departure} to ${row.destination}`,
        items: [{ id: row.id, name: `${row.departure} to ${row.destination}`, price: 40 * reservationCount }]
      };

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}payment`, // Update the URL to match your server configuration
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };


  return (
    <div className="popup">
      <div className="popup-inner">
        <h3>Booking details</h3>
        <div className="details">
          <div>
            <label>Departure:</label>
            <span>{row.departure}</span>
          </div>
          <div>
            <label>Destination:</label>
            <span>{row.destination}</span>
          </div>
          <div>
            <label>Date:</label>
            <span>{Date}</span>
          </div>
          <div>
            <label>Time of Departure:</label>
            <span>{row.Date_Sortie}</span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="reservationCount">Number of Reservations:</label>
          <input
            type="number"
            id="reservationCount"
            className="form-control"
            value={reservationCount}
            min="1"
            onChange={(e) => setReservationCount(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button className="btn btn-success" onClick={handleBookingClick}>
            Proceed to Payment
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupPaiment;
