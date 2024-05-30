import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { AccountContext } from '../contexts/AccountContext';

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

function Rating() {
  const { provider_id } = useParams(); // Retrieve provider_id from URL
  const { user } = useContext(AccountContext); // Access user data from context
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [feedback, setFeedback] = useState('');
  const [submittedRating, setSubmittedRating] = useState(null);
  const [submittedFeedback, setSubmittedFeedback] = useState('');
  const [providerData, setProviderData] = useState(null); // State to hold provider data

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}users/${provider_id}`, {
          headers: {
            Authorization: `Bearer ${user.token}` // Add JWT token to request headers
          }
        });
        setProviderData(response.data);
      } catch (error) {
        console.error('Error fetching provider data:', error);
      }
    };

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
  
    const handleSubmit = () => {
      // Set the submitted values to state variables
      setSubmittedRating(currentValue);
      setSubmittedFeedback(feedback);
      
        // Log the rating and feedback values
    console.log('Rating:', currentValue);
    console.log('Feedback:', feedback);

    // Reset the current rating and feedback text
    setCurrentValue(0);
    setFeedback('');
    };
  
    return (
      <div style={styles.container}>
      {providerData && (
        <div style={styles.providerInfo}>
          <h3>Provider Information</h3>
          <p><strong>Username:</strong> {providerData.username}</p>
          <p><strong>Email:</strong> {providerData.email}</p>
          <p><strong>Phone:</strong> {providerData.phone}</p>
          {/* Add any other provider details you want to display */}
        </div>
      )}
        <h2>Rating</h2>
        <div style={styles.stars}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                style={{
                  marginRight: 10,
                  cursor: "pointer"
                }}
              />
            );
          })}
        </div>
        <textarea
          placeholder="What's your experience?"
          style={styles.textarea}
          value={feedback}
          onChange={handleFeedbackChange}
        />
        <button
          style={styles.button}
          onClick={handleSubmit}
        >
          Submit
        </button>
  
{/*         {submittedRating !== null && (
          <div style={styles.submittedContainer}>
            <h3>Submitted Rating</h3>
            <div style={styles.stars}>
              {stars.map((_, index) => (
                <FaStar
                  key={index}
                  size={24}
                  color={submittedRating > index ? colors.orange : colors.grey}
                  style={{ marginRight: 10 }}
                />
              ))}
            </div>
            <p style={ styles.submittedText}>{submittedFeedback}</p>
          </div>
        )} */}
      </div>
    );
  };


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  }


};


export default Rating;