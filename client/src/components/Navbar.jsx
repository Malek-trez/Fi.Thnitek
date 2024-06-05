import React, { useContext, useState } from 'react';
import { AccountContext } from '../contexts/AccountContext'; // Import the AccountContext
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { BsFillPersonFill } from "react-icons/bs";
import OffersModal from './OffersModal';
import logo from './images/logo.png';
import Logout from './Logout'; // Import the Logout component
import { MdNotifications, MdHistory } from "react-icons/md"; // Import the notification icon


const NavBar = () => {

    // Access the user context
    const { user, logout } = useContext(AccountContext);
    console.log(user);
  
    // Check if the user is logged in
    const isLoggedIn = user.loggedIn;
  
    // If user is logged in, display the username
    const userGreeting = isLoggedIn ? ` ${localStorage.getItem("username")}` : '';
    console.log(userGreeting);
    const userRole = isLoggedIn ? localStorage.getItem("role") : '';
    console.log(userRole);
    const isFournisseur = (userRole==="fournisseur");
    console.log(isFournisseur);
    // State to handle logout action
    const [isLoggingOut, setIsLoggingOut] = useState(false);
  
    if (isLoggingOut) {
      return <Logout />; // Render the Logout component
    }

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

        .dropdown-item:hover {
          color: blue; /* Change to the desired color */
        }
        `}
      </style>
      <Navbar bg="light" variant="light" expand="lg" className="justify-content-between px-0 pr-3">
        <Container fluid className="px-10">
        <Navbar.Brand href="http://localhost:5173/" className="d-flex align-items-center">
            <img
              src={logo}
              height="60"
              className="d-inline-block align-top"
              alt="Fi.Thnitek Logo"
            />
          </Navbar.Brand>
              
            {/*   {isLoggedIn && (
                <div className="text-dark nav-link home-link">
                  <p className="my-4 font-weight-bold ">{userGreeting}</p>
                </div>
              )} */}
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="http://localhost:5173/" className="text-dark nav-link home-link">Home</Nav.Link>
              <Nav.Link href="http://localhost:5173/carpool" className="text-dark nav-link">Carpool</Nav.Link>
              <Nav.Link href="http://localhost:5173/bus" className="text-dark nav-link">Bus</Nav.Link>
              <Nav.Link href="http://localhost:5173/train" className="text-dark nav-link">Train</Nav.Link>
              <Nav.Link href="#footer" className="text-dark nav-link">About Us</Nav.Link>
            </Nav>
            
            <Nav className="me-4">
         
            
            {isLoggedIn && isFournisseur &&(
            <NavDropdown 
                title={"Offer"} 
                id="basic-nav-dropdown" 
                drop="down"
              >
                <OffersModal />
                <NavDropdown.Divider />
                <NavDropdown.Item href="http://localhost:5173/MyOffers">My Offers</NavDropdown.Item>
              </NavDropdown>
            )}
              <NavDropdown 
                title={<BsFillPersonFill size={45} style={iconStyle} />} 
                id="basic-nav-dropdown" 
                drop="down"
              >
                {isLoggedIn && (
                <><NavDropdown.Item href="http://localhost:5173/profilepage">Profile</NavDropdown.Item><NavDropdown.Divider /></>
                 )}
               {!isLoggedIn && (
                <><NavDropdown.Item href="http://localhost:5173/login">Log In</NavDropdown.Item><NavDropdown.Divider /></>
               )}
            
                <NavDropdown.Item href="http://localhost:5173/signup">Sign Up</NavDropdown.Item>
                {isLoggedIn && (
                  <><NavDropdown.Divider /><NavDropdown.Item onClick={() => { logout(); setIsLoggingOut(true); } }> Logout</NavDropdown.Item></>
                )}
              </NavDropdown>
              {isLoggedIn && (
              <><Nav.Link href="http://localhost:5173/notifications" style={notifStyle}>
                  <MdNotifications size={35} style={{ marginRight: '0px' }} />
                </Nav.Link><Nav.Link href="http://localhost:5173/Booking/history" style={notifStyle}>
                    <MdHistory size={35} style={{ marginRight: '0px' }} />
                </Nav.Link></>
            )}
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
  padding: '3px',
  color: 'white',
};
const notifStyle = {
  color: 'linear-gradient(45deg, #00FFFF, #0000FF)',
  borderRadius: '50%',
  padding: '3px',
 
};

export default NavBar;
