import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
};

export default Layout;