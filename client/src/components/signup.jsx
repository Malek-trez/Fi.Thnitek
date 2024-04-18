import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css'; // Import your custom CSS file for additional styles

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    role: 'client'  // valeur par défaut
  });
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      // Vous devez modifier l'URL et probablement gérer l'inscription dans votre backend
      const stuff = import.meta.env.VITE_SERVER_URL;
      console.log("env: ", stuff)
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/signup`, formData, {
        //withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status >= 400) {
        throw new Error(response.data.message || 'Registration failed');
      }

      navigateTo('/login'); // Redirection vers la page de connexion après l'inscription
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <section>
        <div className="container login-block">
          <h2 className="text-center pb-3 mb-3 border-bottom border-primary">Create new Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="client">Client</option>
                <option value="fournisseur">Supplier</option>
              </select>
            </div>
            <button type="submit" className="button-5">Sign Up</button>
            {error && <p className="mt-3 text-danger">{error}</p>}
          </form>
        </div>
      </section>
    </div>
  );
};


export default SignUp;
