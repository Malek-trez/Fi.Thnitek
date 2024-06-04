import React, { useState } from 'react';
import './Popup_paiment.css';

const PopupPaiment = ({ row, onClose, onBooking, Date }) => {
  const [reservationCount, setReservationCount] = useState(1);

  const handleBookingClick = () => {
    onBooking(row, reservationCount);
    onClose();
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
            Proceed to paiment
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