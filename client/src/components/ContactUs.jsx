import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactUs = () => {
  const form = useRef();
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_qnl5ml4', 'template_a6fz6rh', form.current, 'kcWBi_9LzS8xxL0OG')
      .then(
        () => {
          setMessage('Message sent successfully!');
          form.current.reset();
        },
        (error) => {
          setMessage(`Failed to send message. Error: ${error.text}`);
        }
      );
  };

  return (
    <div className="container mt-5">
      <h2>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail} className="mt-4">
        <div className="form-group">
          <label htmlFor="from_name">Name</label>
          <input type="text" className="form-control" id="from_name" name="from_name" required />
        </div>
        <div className="form-group">
          <label htmlFor="from_email">Email</label>
          <input type="email" className="form-control" id="from_email" name="from_email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea className="form-control" id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
      {message && (
        <div className={`alert ${message.startsWith('Failed') ? 'alert-danger' : 'alert-success'} mt-4`} role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default ContactUs;
