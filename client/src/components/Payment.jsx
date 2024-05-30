import React, { useContext, useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  {AccountContext} from "../contexts/AccountContext.jsx";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Payment.css';

const PaymentForm = () => {
  const { user } = useContext(AccountContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.loggedIn === false) {
      navigate('/login');  // Redirect to login page if not logged in
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: ''
  });
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [cardNumberError, setCardNumberError] = useState(null);
  const [expirationDateError, setExpirationDateError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateCardNumber = (cardNumber) => {
    const cardNumberPattern = /^\d{16}$/;
    return cardNumberPattern.test(cardNumber);
  };

  const validateExpirationDate = (expirationDate) => {
    const expirationDatePattern = /^(0[1-9]|1[0-2])\/\d{4}$/;
    return expirationDatePattern.test(expirationDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(formData.email);
    const isCardNumberValid = validateCardNumber(formData.cardNumber);
    const isExpirationDateValid = validateExpirationDate(formData.expirationDate);

    if (!isEmailValid) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError(null);
    }

    if (!isCardNumberValid) {
      setCardNumberError('Please enter a valid 16-digit card number.');
      return;
    } else {
      setCardNumberError(null);
    }

    if (!isExpirationDateValid) {
      setExpirationDateError('Please enter a valid expiration date (MM/YYYY).');
      return;
    } else {
      setExpirationDateError(null);
    }

    // Proceed with form submission if all fields are valid
    try {
      const response = await axios.post(`http://localhost:3000/api/payment`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status >= 400) {
        throw new Error(response.data.message || 'Payment failed');
      }

      // Handle success scenario
      console.log('Payment successful!');
    } catch (error) {
      // Handle error scenario
      console.error('An error occurred:', error.message);
      setError('Payment failed. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <section>
        <div className="container payment-block">
          <h2 className="text-center pb-3 mb-3 border-bottom border-primary">Enter Payment Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
              {emailError && <p className="text-danger">{emailError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="form-control"
                required
              />
              {cardNumberError && <p className="text-danger">{cardNumberError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="cardHolderName" className="form-label">Card Holder Name</label>
              <input
                type="text"
                id="cardHolderName"
                name="cardHolderName"
                value={formData.cardHolderName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
                <input
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="MM/YYYY"
                  required
                />
                {expirationDateError && <p className="text-danger">{expirationDateError}</p>}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <button type="submit" className="button-5">Submit Payment</button>
            {error && <p className="mt-3 text-danger">{error}</p>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default PaymentForm;
