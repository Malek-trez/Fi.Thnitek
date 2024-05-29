import React, { useContext, useState } from 'react';
import { AccountContext } from '../contexts/AccountContext'; // Import the AccountContext

import MyCarousel from './MyCarousel'; // Import the MyCarousel component
import GroupExample from './GroupExample';
import CardExample from './CardExample';
import Messenger from './Messenger';

import street from './images/street.jpg';


import Logout from './Logout'; // Import the Logout component

const Home = () => {
  // Access the user context
  const { user, logout } = useContext(AccountContext);
  console.log(user);

  // Check if the user is logged in
  const isLoggedIn = user.loggedIn;

  // If user is logged in, display the username
  const userGreeting = isLoggedIn ? `Welcome, ${localStorage.getItem("username")}` : '';

  // State to handle logout action
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (isLoggingOut) {
    return <Logout />; // Render the Logout component
  }

  return (
    <div>

      <div style={{ position: 'relative', width: '100%', height: '580px', overflow: 'hidden' }}>
        <img src={street} alt="Travel" style={{ width: '100%', height: 'auto' }} />
        <div style={{width: '90%' , position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', fontSize: '30px', fontWeight: 'bold' , fontFamily: 'Georgia, serif' }}>
          <p>"Travel smarter with Fi.Thnitek – your ultimate companion for carpool services and seamless bus and train ticket bookings. Save time, money, and the planet with every trip!"</p>
        </div>
      </div>

      <h2 className="my-4 text-center text-dark">Experience You Can Count On</h2>
      <GroupExample />
      
      <h2 className="my-4 text-center text-dark">Discover some interesting articles</h2>
      <CardExample />
      
      <h2 className="my-5 text-center text-dark">Fast and Affordable Transportation</h2>
      <MyCarousel />
      
      <Messenger /> 
    </div>
  );
};

export default Home;
