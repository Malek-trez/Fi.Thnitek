import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import Messenger from './Messenger';
import React, { useContext} from 'react';
import { AccountContext } from '../contexts/AccountContext'; 

const Layout = () => {

  // Access the user context
  const { user} = useContext(AccountContext);

  // Check if the user is logged in
  const isLoggedIn = user.loggedIn;
  return (
    <>
      <NavBar />
      {isLoggedIn && (<Messenger/>)}
      
      <Outlet />
      <Footer />
    </>
  )
};

export default Layout;