import React from 'react';

import MyCarousel from './MyCarousel'; // Import the MyCarousel component
import GroupExample from './GroupExample';

import CardExample from './CardExample';
import Messenger from './Messenger';

const Home = () => {
    return (
      <div>
      
      <h2  className="my-4 text-center text-dark">Experience You Can Count On</h2>

      <GroupExample />

      <h2  className="my-4 text-center text-dark">Discover some interesting articles</h2>
      <CardExample />
      
      <h2 className="my-5 text-center text-dark">Fast and Affordable Transportation</h2>
      <MyCarousel />

      <Messenger /> 
      
    </div>
  );

  };
  
export default Home;