import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Payment.css';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can implement your logic for handling payment submission
    console.log('Form submitted:', formData);
    // Example: Send payment data to the server using axios
    try {
      const response = await axios.post(`http://localhost:8000/api/payment`, formData, {
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
