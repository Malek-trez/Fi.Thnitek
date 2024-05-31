import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AccountContext } from '../contexts/AccountContext'; // Import the AccountContext
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './CarpoolCard.css';

const CarpoolCard = ({ carpool, onEmpty }) => {
  const { user } = useContext(AccountContext); // Access the user context
  const [capacity, setCapacity] = useState(carpool.capacity);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const navigateTo=useNavigate();
  const handleBookNow = async (id, event) => {
    event.preventDefault();
    if (capacity === 0) {
      return;
    }
    try {
      // Check if user is logged in
      if (!user.loggedIn) {
        navigateTo('/login');
        return;
      }

      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}carpool/book`, { id });
      console.log(response.data);
      const newCapacity = capacity - 1;
      setCapacity(newCapacity);
      if (newCapacity === 0) {
        onEmpty(id);
        /*setTimeout(() => setIsVisible(false), 10000);*/
      }
      setBookingSuccess(true);
      setIsBooked(true);
      setSuccessMessage('Booked with success!');
      setTimeout(() => setBookingSuccess(false), 2500);
    } catch (error) {
      console.error('Error booking carpool:', error);
    }
  };

  const handleCancelBook = async (id, event) => {
    event.preventDefault();
    try {
      // Check if user is logged in
      if (!user.loggedIn) {
        navigateTo('/login');
         return;
      }

      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}carpool/cancel`, { id });
      console.log(response.data);
      const newCapacity = capacity + 1;
      setCapacity(newCapacity);
      setBookingSuccess(true);
      setIsBooked(false);
      setSuccessMessage('Canceled with success!');
      setTimeout(() => setBookingSuccess(false), 2500);
    } catch (error) {
      console.error('Error cancelling carpool:', error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="carpool-card">
      {bookingSuccess && <div className="alert alert-success" role="alert">{successMessage}</div>}
      <div className="row">
        <div className="col-md-4">
        {/* Render the link only if the user is logged in */}
   
            <img src={carpool.provider_image} className="img-fluid rounded-start h-80" alt="..." />
            <p className="card-text">{`Provider: ${carpool.provider_name}`}</p>
            {user.loggedIn && (
              <Link  to={`/rating/${carpool.provider_id}`} className="rate-link">
                Rate 
              </Link>
            )}
          
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{carpool.depart}</h5>
            <h5 className="card-title">{carpool.destination}</h5>
            <p className="card-text">{`Schedule: ${carpool.schedule}`}</p>
            <p className="card-text">
              {`Capacity: ${capacity}`}
              {capacity === 0 && <span style={{ color: 'red', fontWeight: 'bold' }}> (Full)</span>}
            </p>
            <p className="card-text">{`Price: ${carpool.price}`}</p>
            <a
              href="#"
              className={isBooked ? "btn btn-danger" : "btn btn-primary"}
              onClick={(event) => isBooked ? handleCancelBook(carpool.id, event) : handleBookNow(carpool.id, event)}
              disabled={capacity === 0 && !isBooked}
            >
              {isBooked ? "Cancel" : "Book Now"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarpoolCard;
