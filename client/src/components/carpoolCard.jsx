import React, { useState } from 'react';
import axios from 'axios';

const CarpoolCard = ({ carpool, onEmpty }) => {
  const [capacity, setCapacity] = useState(carpool.capacity);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const handleBookNow = async (id, event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}carpool/book`, { id });
      console.log(response.data);
      const newCapacity = capacity - 1;
      setCapacity(newCapacity);
      if (newCapacity === 0) {
        onEmpty(id);
        setTimeout(() => setIsVisible(false), 10000);
      }
      setBookingSuccess(true);
      setIsBooked(true);
      setSuccessMessage('Booked with success!');
      setTimeout(() => setBookingSuccess(false), 3000);
    } catch (error) {
      console.error('Error booking carpool:', error);
    }
  };

  const handleCancelBook = async (id, event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}carpool/cancel`, { id });
      console.log(response.data);
      const newCapacity = capacity + 1;
      setCapacity(newCapacity);
      setBookingSuccess(true);
      setIsBooked(false);
      setSuccessMessage('Canceled with success!');
      setTimeout(() => setBookingSuccess(false), 3000);
    } catch (error) {
      console.error('Error cancelling carpool:', error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="card">
      {bookingSuccess && <div className="alert alert-success" role="alert">{successMessage}</div>}
      <div className="row">
        <div className="col-md-4">
          <a href={`/profile/${carpool.provider_id}`}>
            <img src={carpool.provider_image}  className="img-fluid rounded-start h-80" alt="..." />
            <p className="card-text">{`Provider: ${carpool.provider_name}`}</p> 
          </a>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{carpool.depart}</h5>
            <h5 className="card-title">{carpool.destination}</h5>
            <p className="card-text">{`Schedule: ${carpool.schedule}`}</p>
            <p className="card-text">{`Capacity: ${capacity}`}</p>
            <p className="card-text">{`Price: ${carpool.price}`}</p>
            <a href="#" className={isBooked ? "btn btn-danger" : "btn btn-primary"} onClick={(event) => isBooked ? handleCancelBook(carpool.id, event) : handleBookNow(carpool.id, event)}>{isBooked ? " Cancel " : "Book Now"}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarpoolCard;
