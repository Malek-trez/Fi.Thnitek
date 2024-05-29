import React, { useContext, useState } from 'react';
import { AccountContext } from '../contexts/AccountContext'; // Import the AccountContext

import MyCarousel from './MyCarousel'; // Import the MyCarousel component
import GroupExample from './GroupExample';
import CardExample from './CardExample';
import Messenger from './Messenger';
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
      {/* Display user greeting if logged in */}
      {isLoggedIn && (
        <div className="text-center">
          <h2 className="my-4 text-dark">{userGreeting}</h2>
          <button onClick={() => { logout(); setIsLoggingOut(true); }} className="btn btn-primary">
            Logout
          </button>
        </div>
      )}

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
