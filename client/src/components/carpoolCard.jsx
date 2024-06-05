import React, { useState, useContext , useEffect } from 'react';
import axios from 'axios';
import { AccountContext } from '../contexts/AccountContext'; // Import the AccountContext
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './CarpoolCard.css';


const CarpoolCard = ({ carpool, onEmpty }) => {
  const { user } = useContext(AccountContext); // Move useContext inside the functional component
  const [capacity, setCapacity] = useState(carpool.capacity);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  console.log(localStorage.getItem("username"));

  const [profile, setProfile] = useState(null);
  console.log(localStorage.getItem("username"));
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Make an HTTP request to fetch user profile data
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}profile`, {
          headers: {
            Authorization: `Bearer ${user.token}` // Add JWT token to request headers
          }
        });
        setProfile(response.data); // Assuming the response contains profile data
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchProfileData();
  }, []); 

// Declare the formatDate function
function formatDate(date) {
  const dateParts = date.split("-");
  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
}

const handleBooking = async (row, reservationCount, user) => {
  console.log('Inside handleBooking');
  try {
    console.log('Row object:', row);

    let date, time;
    if (row.schedule.includes(' ')) {
      [date, time] = row.schedule.split(' ');
    } else {
      date = row.schedule.slice(0, 10); // Extracts 'YYYY-MM-DD'
      time = row.schedule.slice(11); // Extracts 'HH:MM:SS'
    }
    const temps_depart = time;
    const prix = parseFloat(row.price);

    // Format the date in dd/mm/yyyy format
    const formattedDate = formatDate(date);

    const bookingDetails = {
      destination: row.destination,
      departure: row.depart,
      temps_depart: temps_depart,
      Date_depart: formattedDate,
      Utilisateur_ID: profile.id,
      Nombre_reservation: reservationCount,
      prix: prix,
    };
    console.log(bookingDetails);

    const response = await axios.post(`${import.meta.env.VITE_SOCKETIO_SERVER_URL}/carpool/Bookings`, bookingDetails);
    console.log('Booking successful:', response.data);
  } catch (error) {
    console.error('Error booking the trip:', error);
  }
};
  const handleBookNow = async (id, price, event) => {
    event.preventDefault();
    if (capacity === 0) {
      return;
    }
    try {
      // Check if user is logged in
      if (!user.loggedIn) {
        navigate('/login');
        return;
      }
      console.log('Inside handleBookNow'); // Add this line
      await handleBooking(carpool, 1, user); // Pass the user context here
      // Navigate to the payment page with carpoolId and price as URL parameters
      navigate(`/payment?carpoolId=${id}&price=${price}`, { replace: true });
      // Rest of the book code continues execution
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}carpool/book`, { id });
      console.log(response.data);
      const newCapacity = capacity ;
      setCapacity(newCapacity);
      if (newCapacity === 0) {
        onEmpty(id);
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
        navigate('/login');
        return;
      }
      // Rest of the cancel code continues execution
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
              onClick={(event) => isBooked ? handleCancelBook(carpool.id, event) : handleBookNow(carpool.id, carpool.price, event)}
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
