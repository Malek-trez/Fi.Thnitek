import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
  };

  const linkStyle = {
    textAlign: 'left',
    fontSize: '1.25rem',
    color: '#fff', // Set the color to white
    textDecoration: 'none', // Remove underline
    marginLeft: '120px',
  };

  const hoverLinkStyle = {
    ...linkStyle,
    color: 'blue', // Set the color to yellow on hover
  };

  return (
    <footer id="footer" style={footerStyle}>
      <div style={columnsContainer}>
        <div style={columnStyle}>
          <h3 style={headerStyle}>Our Company</h3>
          <p>
            <a
              href="#"
              style={hoveredLink === 'about' ? hoverLinkStyle : linkStyle}
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              About Us
            </a>
          </p>
          <p>
            <a
              href="/team"
              style={hoveredLink === 'team' ? hoverLinkStyle : linkStyle}
              onMouseEnter={() => handleMouseEnter('team')}
              onMouseLeave={handleMouseLeave}
            >
              Our Team
            </a>
          </p>
          <p>
            <a
              href="/contact"
              style={hoveredLink === 'contact' ? hoverLinkStyle : linkStyle}
              onMouseEnter={() => handleMouseEnter('contact')}
              onMouseLeave={handleMouseLeave}
            >
              Contact Us
            </a>
          </p>
        </div>
        <div style={columnStyle}>
          <h3 style={headerStyle}>Our Services</h3>
          <p>
            <a
              href="/carpool"
              style={hoveredLink === 'carpool' ? hoverLinkStyle : linkStyle}
              onMouseEnter={() => handleMouseEnter('carpool')}
              onMouseLeave={handleMouseLeave}
            >
              Carpool
            </a>
          </p>
          <p>
            <a
              href="/bus"
              style={hoveredLink === 'bus' ? hoverLinkStyle : linkStyle}
              onMouseEnter={() => handleMouseEnter('bus')}
              onMouseLeave={handleMouseLeave}
            >
              Bus Ticket Booking
            </a>
          </p>
          <p>
            <a
              href="/train"
              style={hoveredLink === 'train' ? hoverLinkStyle : linkStyle}
              onMouseEnter={() => handleMouseEnter('train')}
              onMouseLeave={handleMouseLeave}
            >
              Train Ticket Booking
            </a>
          </p>
        </div>
        <div style={columnStyle}>
          <h3 style={headerStyle}>Find Us</h3>
          <p style={linkStyle}>RT3/2,2024 INSAT</p>
          <p style={linkStyle}>Tunis, Tunisia</p>
          <div>
            <p style={{ marginLeft: '120px' }}>
              <a href="https://facebook.com" style={iconStyle}><FaFacebook /></a>
              <a href="https://twitter.com" style={iconStyle}><FaTwitter /></a>
              <a href="https://instagram.com" style={iconStyle}><FaInstagram /></a>
            </p>
          </div>
        </div>
      </div>
      <hr style={separatorStyle} />
      <p style={rightsStyle}>&copy; 2024 Fi.Thnitek. All rights reserved.</p>
    </footer>
  );
};

const footerStyle = {
  marginTop: '17rem',
  backgroundColor: ' #000080',
  color: '#fff',
  padding: '1rem 0',
};

const columnsContainer = {
  display: 'flex',
  justifyContent: 'space-around',
};

const columnStyle = {
  flex: '1',
};

const iconStyle = {
  fontSize: '1.5rem',
  margin: '0 0.5rem',
  color: '#fff', // Set the color to white*
};

const separatorStyle = {
  width: '100%',
  borderTop: '1px solid #fff',
};

const rightsStyle = {
  marginTop: '0rem',
  marginBottom: '0rem', // Adjust margin bottom as needed
  fontSize: '1rem',
  textAlign: 'center',
};

const headerStyle = {
  textAlign: 'left',
  marginLeft: '120px',
  marginBottom: '30px',
};

export default Footer;
