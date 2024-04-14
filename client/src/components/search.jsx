import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
function search() {
 /* const [searchField, setSearchField] = useState("");

  const filteredPersons = details.filter(
    person => {
      return (
        person
        .name
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        person
        .email
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return (
      <Scroll>
        <SearchList filteredPersons={filteredPersons} />
      </Scroll>
    );
  }
   */
  return (
    <section className="container mt-3 mb-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group">
            <input 
              className="form-control py-2 border-right-0 border"
              type="search"
              placeholder="Search Carpool..."
            />
            <span className="input-group-append">
              <button className="btn btn-outline-primary border-left-0 border" type="button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
  
}

export default search;