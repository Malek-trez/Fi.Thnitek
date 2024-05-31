import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AccountContext } from '../contexts/AccountContext'; // Import the AccountContext
import { useNavigate } from 'react-router';
import UpdateOffersModal from './UpdateOfferModal';

const CarpoolCard = ({ carpool, onEmpty }) => {
  const { user } = useContext(AccountContext); // Access the user context
  const [capacity, setCapacity] = useState(carpool.capacity);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const navigateTo=useNavigate();


  const handleDeletOffer = async (id, event) => {
    event.preventDefault();
    try {
      // Check if user is logged in
      if (!user.loggedIn) {
        navigateTo('/login');
         return;
      }

      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}carpool_user/delete`, { id });
      console.log(response.data);
      setSuccessMessage('Deleted with success!');
      setTimeout(() => setBookingSuccess(false), 2500);
    } catch (error) {
      console.error('Error Deleting Offer:', error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="card">
      {bookingSuccess && <div className="alert alert-success" role="alert">{successMessage}</div>}
      <div className="row">

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

            <button type="submit" className="btn btn-danger"  onClick={(event) => handleDeletOffer(carpool.id, event)}> Delete </button>
            <UpdateOffersModal carpool={carpool} id={carpool.id} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default CarpoolCard;
