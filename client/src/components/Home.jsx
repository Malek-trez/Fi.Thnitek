import React, { useContext } from 'react';
import { AccountContext } from '../contexts/AccountContext'; // Import the AccountContext

import MyCarousel from './MyCarousel'; // Import the MyCarousel component
import GroupExample from './GroupExample';
import CardExample from './CardExample';
import Messenger from './Messenger';
import { getToken } from '@chakra-ui/react';

const Home = () => {
  // Access the user context
  const { user } = useContext(AccountContext);
  console.log(user);

  // Check if the user is logged in
  const isLoggedIn = user.loggedIn;

  // If user is logged in, display the username
  const userGreeting = isLoggedIn ? `Welcome, ${localStorage.getItem("username")}` : '';

  return (
    <div>
      {/* Display user greeting if logged in */}
      {isLoggedIn && <h2 className="my-4 text-center text-dark">{userGreeting}</h2>}

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
