import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css'; // Import your custom CSS file for additional styles
import { AccountContext } from '../contexts/AccountContext';


const Governorates = ["Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan", "Kasserine", "Kebili", "Kef", "Mahdia", "Manouba", "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"];

const AddOffer = () => {

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

  const [formData, setFormData] = useState({
    depart: '',
    destination: '',
    schedule: '',
    price: 0,
    capacity: '',
    provider_id:  null // Initialize provider_id as null
  });

  useEffect(() => {
    if (profile) {
      // Update the formData with the profile id once the profile is fetched
      setFormData((prevFormData) => ({
        ...prevFormData,
        provider_id: profile.id
      }));
    }
  }, [profile]);

  const [error, setError] = useState(null);
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';
  
    // Basic validation for price
    if (name === 'price') {
      if (!Number(value) || Number(value) < 0) {
        errorMessage = 'Price must be a positive number';
      }
    }
  
    // Basic validation for capacity
    if (name === 'capacity') {
      if (!Number(value) || Number(value) <= 0) {
        errorMessage = 'Capacity must be a positive number';
      }
    }
    
    if (name === 'depart' || name === 'destination') {
      if (!Governorates.includes(value)) {
        errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} must be one of the 24 governorates like "Ariana" }`;
      }
    }

    // Set the form data and error message
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  
    setError(errorMessage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.depart === formData.destination) {
        throw new Error('Departure and destination must be different');
      }
      // Vous devez modifier l'URL et probablement gérer l'inscription dans votre backend
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}AddOffer`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status >= 400) {
        throw new Error(response.data.message || 'Adding offer failed');
      }

      navigateTo('/'); // Redirection vers la page de connexion après l'inscription
    } catch (error) {
      setError(error.message);
    }
  };




  return (
    <div style={{ marginTop: '60px', marginBottom: '100px' }}>
      <section>
        <div className="container login-block">
          <h2 className="text-center pb-3 mb-3 border-bottom border-primary">Add new offer</h2>
          <form id= "AddOfferForm" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="depart" className="form-label">Depart</label>
              <input
                type="text"
                id="depart"
                name="depart"
                value={formData.depart}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="destination" className="form-label">Destination</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="schedule" className="form-label">Temp de départ</label>
              <input
                type="datetime-local"
                id="schedule"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">prix</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="capacity" className="form-label">capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder='Nombre de place disponible'
                className="form-control"
                required
              />
            </div>
            {error && <p className="mt-3 text-danger">{error}</p>}
          </form>
        </div>
      </section>
    </div>
  );
};


export default AddOffer;
