import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";
import Messenger from './Messenger';


const Layout = () => {
  return (
    <>
      <NavBar />
      <Messenger/>
      <Outlet />
      <Footer />
    </>
  )
};

export default Layout;