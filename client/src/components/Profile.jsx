import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AccountContext } from '../contexts/AccountContext'; // Import the AccountContext to access user data

const ProfilePage = () => {
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
  }, []); // Fetch profile data once when the component mounts

  return (
    <div>
      <h1>Profile Page</h1>
      {profile ? (
        <div>
          <p>Name: {profile.username}</p>
          <p>Email: {profile.email}</p>
          {/* Add more profile information as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
