import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarpoolCard from './carpoolCard';
import Search from './search';

const carpool = () => {
    const [Carpools, setCarpools] = useState([]);
    const [filteredCarpools, setFilteredCarpools] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    useEffect(() => {
      const fetchCarpools = async () => {
        try {
          
          const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/carpool`);
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
    const handleFilter = async (searchField, selectedFilter) => {
      try {
        if (searchField === '') {
          setFilteredCarpools(Carpools);
        } else {
          const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/carpool/searchBy${selectedFilter}?${selectedFilter}=${searchField}`);
          const { data } = response.data;
          console.log(data.carpools);
          setFilteredCarpools(data.carpools);
          setSearchPerformed(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    return (
      <div>
        <div>
          <Search carpool={Carpools} handleFilter={handleFilter} />
        </div>
        <div className="container">
          <div className="row">
            {(searchPerformed ? filteredCarpools : Carpools).length > 0 ? (
              (searchPerformed ? filteredCarpools : Carpools).map((carpool) => (
                <div key={carpool.id} className="col-lg-4 mb-3">
                  <CarpoolCard carpool={carpool} onEmpty={handleCarpoolEmpty} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
              <strong style={{ fontSize: '24px', color: 'black' }}>No results found</strong>
             </div>
            )}
          </div>
        </div>
      </div>
    );
};
export default carpool
