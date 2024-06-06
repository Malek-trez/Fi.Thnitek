import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AccountContext } from '../contexts/AccountContext';
import './Notification.css';

const Notification = () => {
  const { user } = useContext(AccountContext);
  const [notifications, setNotifications] = useState([]);
  const [prevNotificationCount, setPrevNotificationCount] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const sound = new Audio('/src/components/sound/livechat.mp3'); // Ensure the path to your sound file is correct

  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    let intervalId;

    const fetchNotifications = async () => {
      try {
        console.log('Fetching notifications...');
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}notifications`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        if (response.data.length > prevNotificationCount) {
          console.log('New notifications fetched:', response.data.length);
          console.log(prevNotificationCount);
          if (userInteracted && soundEnabled) {
            sound.play();
          }
        }
        setPrevNotificationCount(response.data.length);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (user && user.token) {
      fetchNotifications(); // Fetch notifications initially

      intervalId = setInterval(fetchNotifications, 10000); // Set interval to fetch notifications every 10 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clear interval on component unmount
      }
    };
  }, [user, prevNotificationCount, userInteracted, soundEnabled]); // Depend on user, userInteracted, and soundEnabled

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

    if (user && user.token) {
      changeNotificationStatus(); // Call only once when component loads
    }
  }, [user]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div>
      <h1 className="my-4 text-center text-dark">Notifications</h1>
      <div className="text-center">
      <button onClick={toggleSound} className="btn btn-primary mb-3">
        {soundEnabled ? 'Disable Sound' : 'Enable Sound'}
      </button>
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
                  <div>{notification.message}</div>
                  <div>{new Date(notification.created_at).toLocaleString()}</div>
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
