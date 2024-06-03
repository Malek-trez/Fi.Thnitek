import React, { useEffect, useState, useMemo , useContext } from "react";
import axios from 'axios';
import Select from 'react-select';
import Popup from './Popup_paiment_Bus.jsx';
import "./Bus.css"; // Import custom CSS file for styling
import { AccountContext } from "../../contexts/AccountContext.jsx"; 

const SearchBarBus = () => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: 14,
      color: 'black',
      backgroundColor: state.isFocused ? 'lightsteelblue' : 'white',
    }),
  };

  const [searchResults, setSearchResults] = useState([]);
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [departureTime, setDepartureTime] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [cities, setCities] = useState([]);

  const useDate = () => {
    const getCurrentDate = useMemo(() => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }, []);

    const getMaxDate = useMemo(() => {
      const today = new Date();
      today.setMonth(today.getMonth() + 2); // Add 2 months
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }, []);

    return { getCurrentDate, getMaxDate };
  };

  const { getCurrentDate, getMaxDate } = useDate();

  useEffect(() => {
    const fetchedCities = [
      { "Ville_ID": "Tunis" },
      { "Ville_ID": "Gafsa" },
      { "Ville_ID": "Las" },
      { "Ville_ID": "Al-Sammar" },
      { "Ville_ID": "Beni Khedache" },
      { "Ville_ID": "Ben Guerdane" },
      { "Ville_ID": "Djerba" },
      { "Ville_ID": "Tozeur" },
      { "Ville_ID": "Al Fawar" },
      { "Ville_ID": "Siliana" },
      { "Ville_ID": "Médenine" },
      { "Ville_ID": "Tameghza" },
      { "Ville_ID": "Degache" },
      { "Ville_ID": "Kasserine" },
      { "Ville_ID": "Sidi Bouzid" },
      { "Ville_ID": "Nefta" },
      { "Ville_ID": "Souk Lahad" },
      { "Ville_ID": "Sabiba" },
      { "Ville_ID": "Dahmani" },
      { "Ville_ID": "Al-Alaa" },
      { "Ville_ID": "Oueslatia" },
      { "Ville_ID": "Dhahiba" },
      { "Ville_ID": "Redeyef" },
      { "Ville_ID": "Gbili" },
      { "Ville_ID": "Tataouine" },
      { "Ville_ID": "Zarzis" },
      { "Ville_ID": "Douz" },
      { "Ville_ID": "Matmata" },
      { "Ville_ID": "Bizerte" },
      { "Ville_ID": "Sfax" },
      { "Ville_ID": "Sousse" },
      { "Ville_ID": "Lksour" },
      { "Ville_ID": "Ouyoun" },
      { "Ville_ID": "Ain Draham" },
      { "Ville_ID": "Tbarka" },
      { "Ville_ID": "Lkef" },
      { "Ville_ID": "Fousena" },
      { "Ville_ID": "Touiref" },
      { "Ville_ID": "Kaleet Snen" },
      { "Ville_ID": "Malouma" },
      { "Ville_ID": "Tela" },
      { "Ville_ID": "Jendouba" },
      { "Ville_ID": "Feryena" }
    ];
    setCities(fetchedCities);
  }, []);
  

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/Bus/${destination}/${departure}`);
      console.log("API Response:", response); // Log the API response
      setSearchResults(response.data.rows);
    } catch (error) {
      console.error('Error searching for trips:', error);
    }
  };

  const togglePopup = (row = null) => {
    setSelectedRow(row);
    setPopupVisible(!isPopupVisible);
  };
  const { user } = useContext(AccountContext); // Access user data from context
  const [profile, setProfile] = useState(null);
  console.log(localStorage.getItem("username"));
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Make an HTTP request to fetch user profile data
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}profile`, {
          headers: {
            Authorization: `Bearer ${user.token}` // Add JWT token to request headers
          }
        });
        setProfile(response.data); // Assuming the response contains profile data
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchProfileData();
  }, []); 

 
  const handleBooking = async (row, reservationCount) => {
    // Handle booking logic, including saving the number of reservations
    try {
      const bookingDetails = {
        destination: row.destination,
        departure: row.sortie,
        temps_depart: row.temps_sortie,
        Date_depart: departureDate,
        Utilisateur_ID: profile.id,
        Nombre_reservation: reservationCount,
        prix:40
      };
      console.log(bookingDetails);

      const response = await axios.post('http://localhost:3000/Bus/Bookings', bookingDetails);
      console.log('Booking successful:', response.data);
      // You can add further logic here if needed (e.g., show a confirmation message)
    } catch (error) {
      console.error('Error booking the trip:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="search-row">
        <div>
          <Select
            value={departure ? { label: departure, value: departure } : null}
            options={cities.map(city => ({ label: city.Ville_ID, value: city.Ville_ID }))}
            onChange={(selectedOption) => setDeparture(selectedOption.value)}
            placeholder="Departure"
            className="mb-3"
            styles={{ control: (base) => ({ ...base, width: '200px' }), ...customStyles }}
            filterOption={({ label }, inputValue) =>
              label.toLowerCase().startsWith(inputValue.toLowerCase())
            }
          />
        </div>
        <div>
          <Select
            value={destination ? { label: destination, value: destination } : null}
            options={cities.map(city => ({ label: city.Ville_ID, value: city.Ville_ID }))}
            onChange={(selectedOption) => setDestination(selectedOption.value)}
            placeholder="Destination"
            className="mb-3"
            styles={{ control: (base) => ({ ...base, width: '200px' }), ...customStyles }}
            filterOption={({ label }, inputValue) =>
              label.toLowerCase().startsWith(inputValue.toLowerCase())
            }
          />
        </div>
        <div>
          <input
            type="date"
            className="form-control mb-3"
            min={getCurrentDate}
            max={getMaxDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div>

        <h2>Available trips</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Departure</th>
              <th>Time of departure</th>
              <th>Destination</th>
              <th>Time of arrival</th>
              <th>Reservation</th>
            </tr>
          </thead>
          
          <tbody>
            {searchResults && searchResults.map((data, index) => (
              <tr key={index}>
                <td>{data.sortie}</td>
                <td>{data.temps_sortie}</td>
                <td>{data.destination}</td>
                <td>{data.temps_arrivé}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => togglePopup(data)}>
                    Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isPopupVisible && selectedRow && (
          <Popup
            row={selectedRow}
            onClose={togglePopup}
            onBooking={handleBooking}
            Date={departureDate}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBarBus;
