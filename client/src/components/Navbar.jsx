import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { BsFillPersonFill } from "react-icons/bs";
import logo from './images/logo.png';

const NavBar = () => {
  return (
    <>
      <style>
        {`
          .nav-link {
            font-size: 24px;
            margin-right: 50px;
            font-family: 'Georgia', serif; /* Change font family */
          }

          .navbar-brand {
            margin-left: 20px; /* Add margin-left to the Navbar Brand */
          }
          .navbar {
            background-color: white; /* Set the navbar background to white */
            border-bottom: 2px solid; /* Add a solid bottom border to the navbar */
            border-image-slice: 1; /* Ensure the border is visible */
            border-image-source: linear-gradient(45deg, #0000FF, #00FFFF, #0000FF); /* Apply gradient color to the border */
          }
          .dropdown-item {
            font-size: 18px; /* Change font size */
            font-family: 'Georgia', serif; /* Change font family */
          }
        `}
      </style>
      <Navbar bg="light" variant="light" expand="lg" className="justify-content-between px-0 pr-3">
        <Container fluid className="px-10">
        <Navbar.Brand href="#" className="d-flex align-items-center">
            <img
              src={logo}
              height="60"
              className="d-inline-block align-top"
              alt="Fi.Thnitek Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="http://localhost:5173/" className="text-dark nav-link home-link">Home</Nav.Link>
              <Nav.Link href="http://localhost:5173/carpool" className="text-dark nav-link">Carpool</Nav.Link>
              <Nav.Link href="#" className="text-dark nav-link">Bus</Nav.Link>
              <Nav.Link href="http://localhost:5173/train" className="text-dark nav-link">Train</Nav.Link>
              <Nav.Link href="#" className="text-dark nav-link">About Us</Nav.Link>
            </Nav>
            <Nav className="me-auto">
            <NavDropdown 
                title={"Offer"} 
                id="basic-nav-dropdown" 
                drop="down"
              >
                <NavDropdown.Item href="http://localhost:5173/offers">Add New Offer</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Mes offers</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown 
                title={<BsFillPersonFill size={40} style={iconStyle} />} 
                id="basic-nav-dropdown" 
                drop="down"
              >
                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="http://localhost:5173/login">Log In</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="http://localhost:5173/signup">Sign Up</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  );
};

const iconStyle = {
  background: 'linear-gradient(45deg, #00FFFF, #0000FF)',
  borderRadius: '50%',
  padding: '5px',
  color: 'white',
};

export default NavBar;
