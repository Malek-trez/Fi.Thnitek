import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; // Import your custom CSS file for additional styles

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}login`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status >= 400) {
        throw new Error(response.data.message || 'Login failed');
      }

      const data = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('role', data.role);
      navigateTo('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ marginTop: '100px', marginBottom: '150px' }}/*className="d-flex justify-content-center align-items-center vh-100"*/>
      <section>
        <div className="container login-block">
          <h2 className="text-center pb-3 mb-3 border-bottom border-primary">Login</h2>
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
            <button type="submit" className="button-5">Login</button>
            {error && <p className="mt-3 text-danger">{error}</p>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
