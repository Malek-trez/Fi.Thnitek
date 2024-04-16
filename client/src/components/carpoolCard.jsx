import React, { useState } from 'react';
import axios from 'axios';

const carpoolCard = ({ carpool, onEmpty }) => {
  const [capacity, setCapacity] = useState(carpool.capacity);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookNow = async (id, event) => {
    event.preventDefault();
    try {
      const response = await axios.put('http://localhost:8000/api/carpool/book', {id});
      console.log(response.data);
      const newCapacity = capacity - 1;
      setCapacity(newCapacity);
      if (newCapacity === 0) {
        onEmpty(id);
      }
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 3000); // Hide the alert after 3 seconds
    } catch (error) {
      console.error('Error booking carpool:', error);
    }
}
    return (
      capacity > 0 ? (
        <div className="card" style={{width: '18rem'}}>
        {bookingSuccess && <div className="alert alert-success" role="alert">Booked with success!</div>}
          <div className="card-body">
            <h5 className="card-title">{carpool.destination}</h5>
            <p className="card-text">{`Schedule: ${carpool.schedule}`}</p>
            <p className="card-text">{`capacity: ${capacity}`}</p>
            <p className="card-text">{`Price: ${carpool.price}`}</p>
            <a href="#" className="btn btn-primary" onClick={(event) => handleBookNow(carpool.id, event)}>Book Now</a>
          </div>
        </div>
      ) : null
    )
  };

export default carpoolCard