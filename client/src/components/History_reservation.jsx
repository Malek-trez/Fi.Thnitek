import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { AccountContext } from "../contexts/AccountContext.jsx";

const History = () => {
  const { user } = useContext(AccountContext); // Access user data from context
  const [profile, setProfile] = useState(null);
  const [allBookings, setAllBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  const handleCancel = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/carpool/cancel/${id}`);
      console.log(response);
      if (response.status !== 200) {
        throw new Error('Error cancelling booking');
      } else {
        // Remove the cancelled booking from the state
        const updatedBookings = allBookings.filter(booking => booking.reservation_id !== id);
        setAllBookings(updatedBookings);
      }
    } catch (error) {
      console.error('There has been a problem with your delete operation:', error);
    }
  };
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
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
  }, [user.token]); // Run this effect when the component mounts and when the token changes

  useEffect(() => {
    if (!profile) return; // Wait until profile data is fetched

    const fetchBusBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Bus/Bookings');
        return response.data.map(booking => ({ ...booking, type: 'Bus' }));
      } catch (error) {
        console.error('Error fetching bus bookings:', error);
        return [];
      }
    };

    const fetchTrainBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Train/Bookings');
        return response.data.map(booking => ({ ...booking, type: 'Train' }));
      } catch (error) {
        console.error('Error fetching train bookings:', error);
        return [];
      }
    };

    const fetchCarpoolBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/carpool/Bookings');
        return response.data.map(booking => ({ ...booking, type: 'Carpool' }));
      } catch (error) {
        console.error('Error fetching carpool bookings:', error);
        return [];
      }
    };

    const fetchAllBookings = async () => {
      const [busBookings, trainBookings, carpoolBooking] = await Promise.all([fetchBusBookings(), fetchTrainBookings(),fetchCarpoolBookings()]);
      const combinedBookings = [...busBookings, ...trainBookings, ...carpoolBooking];

      // Sort bookings by date in descending order
      combinedBookings.sort((a, b) => new Date(b.date_depart) - new Date(a.date_depart));

      // Filter bookings to show only those that belong to the current user
      const userBookings = combinedBookings.filter(booking => booking.utilisateur_id === profile.id);

      setAllBookings(userBookings);
      setFilteredBookings(userBookings);
    };

    fetchAllBookings();
  }, [profile]);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredBookings(allBookings);
    } else {
      setFilteredBookings(allBookings.filter(booking => booking.type.toLowerCase() === filter));
    }
  }, [filter, allBookings]);

  // Function to format the date string
  const formatDate = (dateString) => {
    return dateString.slice(0, 10); // Extracting the date part (YYYY-MM-DD)
  };

  // Function to capitalize the first letter of a string and make the rest lowercase
  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // Function to handle date input change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    filterBookingsByDate(event.target.value);
  };

  // Function to filter bookings based on selected date
  const filterBookingsByDate = (selectedDate) => {
    const filtered = allBookings.filter(booking => new Date(booking.date_depart) <= new Date(selectedDate));
    setFilteredBookings(filtered);
  };
   console.log(filteredBookings);
  return (
    <div className="container mt-4">
      <h2>Booking History</h2>
      <div className="btn-group mb-3" role="group">
        <button
          type="button"
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          type="button"
          className={`btn ${filter === 'bus' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setFilter('bus')}
        >
          Bus
        </button>
        <button
          type="button"
          className={`btn ${filter === 'train' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setFilter('train')}
        >
          Train
        </button>
        <button
          type="button"
          className={`btn ${filter === 'carpool' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setFilter('carpool')}
        >
          Carpool
        </button>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Filter by Date:</span>
        <input
          type="date"
          className="form-control"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Destination</th>
            <th>Departure</th>
            <th>Departure Time</th>
            <th>Departure Date</th>
            <th>Number of Reservations</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking, index) => (

            <tr key={index}>
              <td>{booking.type}</td>
              <td>{capitalizeFirstLetter(booking.destination)}</td>
              <td>{capitalizeFirstLetter(booking.depart)}</td>
              <td>{booking.temps_depart}</td>
              <td>{formatDate(booking.date_depart)}</td>
              <td>{booking.nombre_reservation}</td>
              <td>{booking.prix}</td>
              <td>
              {booking.type === 'Carpool' && new Date(booking.date_depart) > new Date() && (
                <button className="btn btn-danger" onClick={() => handleCancel(booking.reservation_id)}>Cancel</button>
              )}
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
