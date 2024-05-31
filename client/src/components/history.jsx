import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { AccountContext } from '../contexts/AccountContext';

const PaymentHistory = () => {

  const { user } = useContext(AccountContext); // Access user data from context
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch user's payment history from the server
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}payments`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}` // Add JWT token to request headers
          },
        });
        setPayments(response.data.payments);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    fetchPaymentHistory();
  }, []);

  return (
    <div className="payment-history">
      <style>
        {`
          .payment-history {
            margin: 20px;
          }

          .history-heading {
            font-size: 24px;
            margin-bottom: 10px;
          }

          .history-list {
            display: grid;
            grid-gap: 20px;
          }

          .payment-item {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .payment-details {
            flex: 1;
          }

          .payment-amount {
            font-weight: bold;
            font-size: 18px;
          }

          .payment-description {
            margin-top: 5px;
            color: #666;
          }

          .payment-status {
            margin-top: 5px;
            color: #333;
          }
        `}
      </style>
      <h2 className="history-heading">Payment History</h2>
      <div className="history-list">
        {payments.map((payment) => (
          <div key={payment.id} className="payment-item">
            <div className="payment-details">
              <div className="payment-amount">${payment.amount}</div>
              <div className="payment-description">{payment.description}</div>
              <div className="payment-status">{payment.status}</div>
              {/* Add more payment details as needed */}
            </div>
            {/* Add additional UI elements or actions for each payment */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
