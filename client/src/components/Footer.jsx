import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={columnsContainer}>
        <div style={columnStyle}>
          <h3>Our Company</h3>
          <p><a href="/about" style={linkStyle}>About Us</a></p>
          <p><a href="/team" style={linkStyle}>Our Team</a></p>
          <p><a href="/contact" style={linkStyle}>Contact Us</a></p>
        </div>
        <div style={columnStyle}>
          <h3>Our Services</h3>
          <p><a href="/carpool" style={linkStyle}>Carpool</a></p>
          <p><a href="/service2" style={linkStyle}>Bus</a></p>
          <p><a href="/service3" style={linkStyle}>Train</a></p>
        </div>
        <div style={columnStyle}>
          <h3>Find Us</h3>
          <p>123 Main Street</p>
          <p>City, State ZIP</p>
          <div>
            <a href="https://facebook.com" style={iconStyle}><FaFacebook /></a>
            <a href="https://twitter.com" style={iconStyle}><FaTwitter /></a>
            <a href="https://instagram.com" style={iconStyle}><FaInstagram /></a>
          </div>
        </div>
      </div>
      <hr style={separatorStyle} />
      <p style={rightsStyle}>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: ' #000080',
  color: '#fff',
  textAlign: 'center',
  padding: '1rem 0',
};

const columnsContainer = {
  display: 'flex',
  justifyContent: 'space-around',
};

const columnStyle = {
  flex: '1',
};

const linkStyle = {
  color: '#fff', // Set the color to white
  textDecoration: 'none', // Remove underline
};

const iconStyle = {
  fontSize: '1.5rem',
  margin: '0 0.5rem',
  color: '#fff', // Set the color to white
};

const separatorStyle = {
  width: '100%',
  borderTop: '1px solid #fff',

};

const rightsStyle = {
  marginTop: '0rem',
  marginBottom: '0rem', // Adjust margin bottom as needed
  fontSize: '1rem',
};

export default Footer;
