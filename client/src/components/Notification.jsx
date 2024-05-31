import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AccountContext } from '../contexts/AccountContext';
import './Notification.css';

const Notification = () => {
  const { user } = useContext(AccountContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}notifications`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (user && user.token) {
      fetchNotifications();
    }
  }, [user]);

  useEffect(() => {
    const changeNotificationStatus = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}changeNotifStatus`, null, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
      } catch (error) {
        console.error('Error changing notification status:', error);
      }
    };

    if (notifications.length > 0 && user && user.token) {
      changeNotificationStatus();
    }
  }, [notifications, user]);

  return (
    <div>
        <div className="Title">
    <h1>Notifications</h1>
    </div>
    {notifications.length === 0 ? (
      <p>No new notifications</p>
    ) : (
      <ul>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <li style={{ backgroundColor: notification.status === 'unread' ? '#ccc' : 'transparent' }}>
              <strong>{notification.title}</strong> 
              <div className="notification-item">
                <div>
               {notification.message}</div><div> {new Date(notification.created_at).toLocaleString()}</div>
               </div>
            </li>
            {index !== notifications.length - 1 && <hr />} 
          </React.Fragment>
        ))}
      </ul>
    )}
  </div>
  

  );
};

export default Notification;