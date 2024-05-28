import React from 'react';
import './Popup_paiment.css'; 

const Popup = ({ row, togglePopup }) => {

  const handlePayment = () => {
    // Handle proceed to payment logic here
    console.log('Proceed to payment');
  };
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Reservation Details</h2>
        <p><strong>Departure:</strong> {row.departure}</p>
        <p><strong>Time of Departure:</strong> {row.Date_Sortie}</p>
        <p><strong>Destination:</strong> {row.destination}</p>
        <p><strong>Time of Arrival:</strong> {row.Date_Arret}</p>
        <div className="popup-buttons">
          <button className="btn proceed-btn" onClick={handlePayment}>Proceed to Payment</button>
          <button className="btn cancel-btn" onClick={togglePopup}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;