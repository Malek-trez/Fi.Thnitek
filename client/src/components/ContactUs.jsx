import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactUs.css'; // Import the CSS file

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
    <div className="contact-container">
    <h2>Contact Us</h2>
    <form ref={form} onSubmit={sendEmail} className="contact-form">
      <label>Name</label>
      <input type="text" name="user_name" className="input-field" />
      <label>Email</label>
      <input type="email" name="user_email" className="input-field" />
      <label>Message</label>
      <textarea name="message" className="textarea-field" />
      <input type="submit" value="Send" className="submit-button" />
    </form>
    {message && (
      <div className={`alert ${message.startsWith('Failed') ? 'alert-danger' : 'alert-success'}`} role="alert">
        {message}
      </div>
    )}
  </div>
      )};

export default ContactUs;
