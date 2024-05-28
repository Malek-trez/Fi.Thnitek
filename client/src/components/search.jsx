import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Search({ handleFilter }) {
  const [searchField, setSearchField] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("destination"); 

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleSearch = () => {
    handleFilter(searchField, selectedFilter);
  };

  
  return (
    <section className="container mt-3 mb-3">
      <div className="row justify-content-center">
        <div className="col d-flex justify-content-center">
          <div className="d-flex align-items-center" style={{ maxWidth: '600px' }}>
            <div className="d-flex">
              <select 
                className="custom-select py-2 border-left-0 border"
                style={{ width: '120px', backgroundColor: '#0275d8', color: 'white' }}
                value={selectedFilter}
                onChange={handleFilterChange}
              >
                <option style={{ backgroundColor: 'white', color: '#333' }} value="destination">Destination</option>
                <option style={{ backgroundColor: 'white', color: '#333' }} value="depart">Depart</option>
                <option style={{ backgroundColor: 'white', color: '#333' }} value="price">Price</option>
              </select>
            </div>
            <div className="input-group w-100 ml-2"> 
              <input 
                className="form-control py-2 border-right-0 border"
                type="search"
                placeholder="Search Carpool..."
                value={searchField}
                onChange={handleChange}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-primary border-left-0 border h-100" type="button" onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Search;
