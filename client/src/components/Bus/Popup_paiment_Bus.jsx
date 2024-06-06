import React, { useState, useContext } from 'react';
import { AccountContext } from '../../contexts/AccountContext';
import './Popup_paiment_Bus.css';


const PopupPaiment = ({ row, onClose, onBooking, Date }) => {
  const [reservationCount, setReservationCount] = useState(1);
  const { user } = useContext(AccountContext); // Access user data from context

  const handleBookingClick = async () => {
    if (!user.loggedIn) {
      navigate('/login');
      return;
    }
    const token = localStorage.getItem('token');
    try {
      onBooking(row, reservationCount);
      onClose();
      
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`

        },
        body: JSON.stringify({
          type: 'bus',
          amount: 40 * reservationCount, // Adjust this according to your pricing logic
          name: `${row.sortie} to ${row.destination}`,
          items: [{ name: `${row.sortie} to ${row.destination}`, amount: row.price * reservationCount, quantity: reservationCount }],
        
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment session');
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Payment URL not found');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h3>Booking details</h3>
        <div className="details">
          <div>
            <label>Departure:</label>
            <span>{row.sortie}</span>
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
            <span>{row.temps_sortie}</span>
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
            Proceed to payment
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
