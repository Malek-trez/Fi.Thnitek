import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarpoolCard from './carpoolCard';
import Search from './search';

const carpool = () => {
    const [Carpools, setCarpools] = useState([]);
    useEffect(() => {
      const fetchCarpools = async () => {
        try {
          
          const response = await axios.get('http://localhost:8000/api/carpool');
          const { data } = response.data;
          setCarpools(data.carpools);
          
        } catch (err) {
          console.error(err);
        }
      };
  
    fetchCarpools();
    }, []);
    
    const handleCarpoolEmpty = (id) => {
      setCarpools(Carpools.filter(carpool => carpool.id !== id));
    };
    
    return (
     <div className="container">
      <Search/>
       <div className="row">
        {Carpools.map((carpool) => (
            <div key={carpool.id} className="col-lg-4 mb-3">
             <CarpoolCard carpool={carpool} onEmpty={handleCarpoolEmpty} />
           </div>
        ))}
       </div>
      </div>
    );
};
export default carpool
