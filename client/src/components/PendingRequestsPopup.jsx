import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PendingRequestsPopup.css';
import { AccountContext } from '../contexts/AccountContext';

const PendingRequestsPopup = () => {
  const { user } = useContext(AccountContext);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}booking`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setRequests(response.data.pendingRequests);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, [user.token]);

  const handleResponse = async (requestId, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_SERVER_URL}booking`, {
        requestId,
        status
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setRequests(requests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const handleClose = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h2 className="popup-title">Pending Booking Requests</h2>
          <button className="close-button" onClick={handleClose}>&times;</button>
        </div>
        <div>
          {requests.length > 0 ? (
            requests.map(request => (
              <div key={request.id} className="request-item">
                <div className="request-info">
                  <p>Client ID: {request.client_id}</p>
                  <p>Carpool ID: {request.carpool_id}</p>
                  <p>Requested At: {new Date(request.created_at).toLocaleString()}</p>
                </div>
                <div className="button-group">
                  <button className="accept-button" onClick={() => handleResponse(request.id, 'accepted')}>Accept</button>
                  <button className="decline-button" onClick={() => handleResponse(request.id, 'rejected')}>Reject</button>
                </div>
              </div>
            ))
          ) : (
            <p>No pending requests.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingRequestsPopup;
