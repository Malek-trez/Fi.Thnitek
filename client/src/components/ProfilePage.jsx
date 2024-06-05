import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AccountContext } from '../contexts/AccountContext'; 


const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const { user } = useContext(AccountContext); 

  const handleConsultProfile = async () => {
    try {
    // Make an HTTP request to fetch user profile data
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}profilepage`, {
      headers: {
        Authorization: `Bearer ${user.token}` // Add JWT token to request headers
      }
    });
      setProfileData(response.data);
      setName(response.data.username);
      setPhone(response.data.phone);
      setEmail(response.data.email);
      setImageUrl(response.data.imageurl)
      setError(null);
      setButtonClicked(true);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Error fetching profile data');
      setProfileData(null);
    }
  };

  useEffect(() => {
    // Call handleConsultProfile when the component mounts
    handleConsultProfile();
  }, []); 



  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccessMessage(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    //const updatedProfile = { name, phone, email, imageUrl, password, newPassword };
    const formData = new FormData(); // Créer un objet FormData
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('newPassword', newPassword);
    if (avatar) { // Ajouter l'avatar s'il est sélectionné
      formData.append('avatar', imageUrl);
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}profileEdit`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}` // Add JWT token to request headers
        }
      });

      if (response.status === 201) {
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully.');
      } else {
        throw new Error(response.data.message || 'Editing failed');
      }
       
    } catch (error) {
      setError(error.response.data.message || 'Error updating user profile');
    }
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setPhone(inputValue);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteProfile = async (e) => {
    e.preventDefault();

    if (!deletePassword) {
      setError('Password is required for profile deletion.');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}profiledel`, {
        password: deletePassword, // Send password in the body
      }, {
        headers: {
          Authorization: `Bearer ${user.token}` // Add JWT token to request headers
        }
      });

      if (response.status >= 400) {
        throw new Error(response.data.message || 'Deletion failed');
      }

    // Définir la fonction navigateTo pour rediriger l'utilisateur vers une autre URL
    const navigateTo = (url) => {
      window.location.href = url; // Rediriger vers l'URL spécifiée
    };
    // Rediriger l'utilisateur après la suppression réussie
    navigateTo('http://localhost:5173/');
    } 

catch (error) {
  if (error.response && error.response.data && error.response.data.message) {
    setError(error.response.data.message);
  } else {
    setError('Deletion failed');
  }
}
};


const handleDeleteClick = () => {
  setShowDeleteModal(true);
};

const handleCancel = () => {
  window.location.reload();
};

const handleModalClose = () => {
  setShowDeleteModal(false);
  setDeletePassword('');
};

  return (
    <div className='profile-container' >
      <h1 className='user'>Profile Details</h1>
      {profileData && (
        <div >
          <img className='profile-picture' src={imageUrl} alt="Profile" />
          {isEditing ? (
            <div className="edit-form">
              <label htmlFor="avatarInput" className="icon-button" style={{marginBottom:'20px'}}>
                 Edit Profile Picture
              </label>
              <input
                type="text"
                placeholder="Username"
                className="form-control mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="form-control mb-2"
                value={phone}
                onChange={handlePhoneChange}
              />
              <input
                type="email"
                placeholder=" Email"
                className="form-control mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-2"
                placeholder="Current Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control mb-2"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="file"
                id="avatarInput"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
              {error && <p className="error-message">{error}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
              <button className='button-5' onClick={handleSave}>Save</button>
              <button className='button-6'onClick={handleCancel}style={{backgroundColor:"green"}} > Cancel</button>
            </div>
          ) : (
            <div style={{}}>
              <h1 className='details'>  {name} </h1>
              <p className='details' style={{fontSize:'20px',textAlign: 'left',marginTop:'20px'}}><strong>Phone Number:</strong>  {phone}</p>
              <p className='details' style={{fontSize:'20px',textAlign: 'left'}}><strong>Email:</strong>   {email}</p>
              <div style={{marginTop:'20px'}}>
                <button className='button-5' onClick={handleEdit}>Edit</button>
                <button className='button-6' onClick={handleDeleteClick}> Delete</button>
              </div>
            </div>
          )}
        </div>
      )}

{showDeleteModal && (
        <div className='delete-modal' style={{marginTop:'20px'}}>
          <div className='delete-modal-content'>
            <h3>Confirm Deletion</h3>
            <p>Please enter your password to confirm deletion:</p>
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <div className='modal-buttons'>
              <button className='button-5' onClick={handleModalClose}style={{backgroundColor:"green"}} >Cancel</button>
              <button className='button-6' onClick={handleDeleteProfile} >Delete</button>

            </div>
          </div>
        </div>
      )}
     
    </div>
  );
};

export default ProfilePage;