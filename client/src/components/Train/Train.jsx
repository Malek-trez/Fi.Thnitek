import React, { useEffect, useState , useMemo,useContext} from "react";
import "./Train.css"; // Import custom CSS file for styling
import axios from 'axios';
import Select from 'react-select';
import Popup from './Popup_paiment.jsx';
import { AccountContext } from "../../contexts/AccountContext.jsx"; 

const SearchBarTrain = () => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: 14,
      color: 'black',
      backgroundColor: state.isFocused ? 'lightsteelblue'  : 'white',                  
    }),
  };

  const [searchResults, setSearchResults] = useState([]);
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [cities, setCities] = useState([]);
  const [departureDate, setDepartureDate] = useState(null);
  const [departureTime, setDepartureTime] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  let hour = null;
  if (departureTime !== null) {
    hour = departureTime.split(":")[0];
  }
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
      {"Ville_ID":"TUNIS"},
      {"Ville_ID":"HAMMAM LIF"},
      {"Ville_ID":"BORJ CEDRIA"},
      {"Ville_ID":"GROMBALIA"},
      {"Ville_ID":"BOU ARGOUB"},
      {"Ville_ID":"BOUFICHA"},
      {"Ville_ID":"ENFIDHA"},
      {"Ville_ID":"KALAA KEBIRA"},
      {"Ville_ID":"KALAA SEGHIRA"},
      {"Ville_ID":"SOUSSE"},
      {"Ville_ID":"MESSADINE"},
      {"Ville_ID":"MONASTIR"},
      {"Ville_ID":"MAHDIA"},
      {"Ville_ID":"KERKER"},
      {"Ville_ID":"EL JEM"},
      {"Ville_ID":"EL HENCHA"},
      {"Ville_ID":"DOKHANE"},
      {"Ville_ID":"SAKIET EZZIT"},
      {"Ville_ID":"SFAX"},
      {"Ville_ID":"MAHARES"},
      {"Ville_ID":"GABES"},
      {"Ville_ID":"SENED"},
      {"Ville_ID":"GAFSA"},
      {"Ville_ID":"METLAOUI"},
      {"Ville_ID":"MANOUBA"},
      {"Ville_ID":"JEDEIDA"},
      {"Ville_ID":"TEBOURBA"},
      {"Ville_ID":"BORJ TOUM"},
      {"Ville_ID":"MEJEZ EL BAB"},
      {"Ville_ID":"OUED ZARGA"},
      {"Ville_ID":"SIDI MHIMECH"},
      {"Ville_ID":"BEJA"},
      {"Ville_ID":"MASTOUTA"},
      {"Ville_ID":"SIDI SMAIL"},
      {"Ville_ID":"BOU SALEM"},
      {"Ville_ID":"BEN BECHIR"},
      {"Ville_ID":"JENDOUBA"},
      {"Ville_ID":"OUED MELIZ"},
      {"Ville_ID":"GHARDIMAOU"},
      {"Ville_ID":"KALAA KHASBA"},
      {"Ville_ID":"OUED SARRATH"},
      {"Ville_ID":"GOURAÏA"},
      {"Ville_ID":"FEJ ET TAMEUR"},
      {"Ville_ID":"AIN MESRIA"},
      {"Ville_ID":"LE KEF"},
      {"Ville_ID":"DAHMANI"},
      {"Ville_ID":"LES ZOUARINES"},
      {"Ville_ID":"LES SALINES"},
      {"Ville_ID":"LE SERS"},
      {"Ville_ID":"TRIKA"},
      {"Ville_ID":"SIDI BOU ROUIS"},
      {"Ville_ID":"EL KRIB"},
      {"Ville_ID":"EL AKHOUAT"},
      {"Ville_ID":"GAAFOUR"},
      {"Ville_ID":"SIDI AYED"},
      {"Ville_ID":"EL AROUSSA"},
      {"Ville_ID":"BOU ARADA"},
      {"Ville_ID":"PONT DU FAHS"},
      {"Ville_ID":"DEPIENNE"},
      {"Ville_ID":"BIR M'CHERGA"},
      {"Ville_ID":"CHEYLUS"},
      {"Ville_ID":"OUDNA"},
      {"Ville_ID":"KHELIDIA"},
      {"Ville_ID":"NAASSEN"},
      {"Ville_ID":"BIR KASSAA"},
      {"Ville_ID":"JEBEL JELLOUD"},
      {"Ville_ID":"CHAOUAT"},
      {"Ville_ID":"SIDI OTHMAN"},
      {"Ville_ID":"AIN GHELAL"},
      {"Ville_ID":"MATEUR"},
      {"Ville_ID":"TINJA"},
      {"Ville_ID":"LA PECHERIE"},
      {"Ville_ID":"BIZERTE"},
      {"Ville_ID":"FOUNDOUK JEDID"},
      {"Ville_ID":"TURKI"},
      {"Ville_ID":"BELLI"},
      {"Ville_ID":"HAMMAMET"},
      {"Ville_ID":"OMAR KHAYEM"},
      {"Ville_ID":"NABEUL"},
      {"Ville_ID":"BIR BOU REGBA"},
      {"Ville_ID":"GHRAIBA"},
      {"Ville_ID":"MAKNASSY"},
      {"Ville_ID":"MRAZGA"},
      {"Ville_ID":"KHANGUET"}
    ];
    setCities(fetchedCities);
  }, []);


  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/Arret/${destination}/${departure}/${hour}`);
      setSearchResults(response.data.rows);
      console.log(response.data.rows);
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
        departure: row.departure,
        temps_depart: row.Date_Sortie,
        Date_depart: departureDate,
        Utilisateur_ID: profile.id,
        Nombre_reservation: reservationCount,
        prix:40
      };

      const response = await axios.post('http://localhost:3000/train/Bookings', bookingDetails);
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
            onFocus={() => setDeparture("")}
            onMouseDown={(e) => { e.target.select(); setDeparture("") }}
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
            onFocus={() => setDestination("")}
            onMouseDown={(e) => { e.target.select(); setDestination("") }}
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
        <div>
          <input
            type="time"
            className="form-control mb-3"
            onChange={(e) => setDepartureTime(e.target.value)}
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
                <td>{data.departure}</td>
                <td>{data.Date_Sortie}</td>
                <td>{data.destination}</td>
              <td>{data.Date_Arret}</td>
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

export default SearchBarTrain;