import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaStar, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { AccountContext } from '../contexts/AccountContext';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import './login.css';

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
  blue: "#007BFF"
};

function Rating({ carpool, onEmpty }) {
  const navigateTo = useNavigate();
  const { provider_id } = useParams(); // Retrieve provider_id from URL
  const { user } = useContext(AccountContext);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [feedback, setFeedback] = useState('');
  const [providerData, setProviderData] = useState(null); 
  const [hoveredLike, setHoveredLike] = useState(null); 
  const [hoveredDislike, setHoveredDislike] = useState(null); 
  
  useEffect(() => {
  const fetchProviderData = async () => {
  try {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}users/${provider_id}`, {
    headers: {
    Authorization: `Bearer ${user.token}` 
    }
    });
    setProviderData(response.data);
    } catch (error) {
    console.error('Error fetching provider data:', error);
    }  };

  fetchProviderData();
  }, [provider_id, user.token]);
  const stars = Array(5).fill(0);
  const handleClick = value => {
  setCurrentValue(value);
  };

  const handleMouseOver = newHoverValue => {
  setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
  setHoverValue(undefined);
  };

  const handleFeedbackChange = (event) => {
  setFeedback(event.target.value);
  };

  const handleSubmit = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}rating`, {
    provider_id,
    rating: currentValue,
    feedback,
    }, {
    headers: {
    Authorization: `Bearer ${user.token}`
    }
    });
    // Reset the current rating and feedback text
    setCurrentValue(0);
    setFeedback('');
    // Log the response
    console.log('Rating submitted successfully:', response.data);
    navigateTo('/carpool');
  } catch (error) {
  console.error('Error submitting rating:', error);
  }};


  const handleLike = async (feedbackId) => {
  try {
  await axios.post(`${import.meta.env.VITE_SERVER_URL}feedback/${feedbackId}/like`, {}, {
  headers: {
  Authorization: `Bearer ${user.token}`
  }
  });
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}users/${provider_id}`, {
    headers: {
    Authorization: `Bearer ${user.token}`
    }
  });
  setProviderData(response.data);
  } catch (error) {
  console.error('Error liking feedback:', error);
  }};

  const handleDislike = async (feedbackId) => {
  try {
  await axios.post(`${import.meta.env.VITE_SERVER_URL}feedback/${feedbackId}/di
    slike`, {}, {
    headers: {
    Authorization: `Bearer ${user.token}`
    }
  });
  // Refresh provider data after disliking
  const response = await
    axios.get(`${import.meta.env.VITE_SERVER_URL}users/${provider_id}`, {
      headers: {
      Authorization: `Bearer ${user.token}`
      }
    });
    setProviderData(response.data);
  } catch (error) {
  console.error('Error disliking feedback:', error);
  }};

  return (
  <div className='delete-modal-content' style={{ marginTop: '30px',alignItems: 'center', justifyContent: 'center', maxWidth: '700px' }}>
  {providerData && (
    <div style={styles.providerInfo}>
    <h2 className="my-4 text-center text-dark">Provider Information</h2>
    <div style={styles.infoGroup}>
    <img src={providerData.imageurl} alt="Provider" style={styles.providerPhoto} />
      <p><strong>Username:</strong> {providerData.username}</p>
      <p><strong>Email:</strong> {providerData.email}</p>
      <p><strong>Phone:</strong> {providerData.phone}</p>
      <p><strong>Average Rating: </strong>{providerData.average_rating}</p>
    </div>

    <h3 style={styles.feedbackTitle}>Other Feedback</h3>
    <ul style={styles.feedbackList}>
      {providerData.feedback.map((fb, index) => (
    <li key={index} style={styles.feedbackItem}>
        <img
        src="https://static.vecteezy.com/system/resources/previews/009/210/368/non_2x/review-icon-line-monoline-symbol-suggestions-and-critics-customer-chat-gives-an-assessment-vector.jpg" alt={fb.username}
        style={styles.feedbackPhoto} />
        <div style={styles.feedbackContent}>
        <strong>{fb.username}:</strong> {fb.feedback}
        <div style={styles.likeDislikeButtons}>

        <button
          onClick={() => handleLike(fb.id)}
          onMouseEnter={() => setHoveredLike(index)}
          onMouseLeave={() => setHoveredLike(null)}
          style={{
          ...styles.likeButton,
          color: hoveredLike === index ? colors.blue :
          colors.grey
          }}
        >
        <FaThumbsUp />
        </button>
        <button
          onClick={() => handleDislike(fb.id)}
          onMouseEnter={() => setHoveredDislike(index)}
          onMouseLeave={() => setHoveredDislike(null)}
          style={{
          ...styles.dislikeButton,
          color: hoveredDislike === index ? colors.blue :
          colors.grey
          }}
        >
        <FaThumbsDown />
        </button>
        </div>
        </div>
    </li>
    ))}
    </ul>
    </div>
    )}
    <h2 className="my-4 text-center text-dark">Your Rating & Feedback</h2>
    <div style={styles.stars}>
    {stars.map((_, index) => {
    return (
    <FaStar
      key={index}
      size={24}
      onClick={() => handleClick(index + 1)}
      onMouseOver={() => handleMouseOver(index + 1)}
      onMouseLeave={handleMouseLeave}
      color={(hoverValue || currentValue) > index ?
      colors.orange : colors.grey}
      style={{marginRight: 10,cursor: "pointer"}}
    />

    );
    })}
    </div>
      <textarea
      placeholder="How was your experience?"
      style={styles.textarea}
      value={feedback}
      onChange={handleFeedbackChange}
      />
      <button
      className='button-5'
      style={styles.button}
      onClick={handleSubmit}>
          Submit
      </button>
    </div>
    );
  };
  
  const styles = {
  providerInfo: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
  },
  infoGroup: {
    marginBottom: '20px'
  },
  providerPhoto: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px'
  },
  feedbackTitle: {
    marginBottom: '10px',
    color: '#333'
  },
  feedbackList: {
    listStyleType: 'none',
    paddingLeft: 0
  },
  feedbackItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px'
  },
  feedbackPhoto: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '10px'
  },
  feedbackContent: {
   flexGrow: 1
  },
  likeDislikeButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '5px'
  },
  likeButton: {
    marginRight: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2em'
  },
  dislikeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2em'
  },
  stars: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center", // Center horizontally
    alignItems: "center" // Center vertically
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px auto", // Center horizontally with auto margin
    minHeight: 100,
    width: '90%',
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: '90%',
    padding: 10,
    margin: "20px auto", // Center horizontally with auto margin
    textAlign: "center" // Center text horizontally
  }
  };export default Rating;