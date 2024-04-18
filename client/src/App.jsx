import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login  from "./components/login";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Carpool from "./components/carpool";
import SignUp from "./components/signup";
import ChatHome from "./components/Chat/ChatHome.jsx";
import UserContext from "./contexts/AccountContext.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <UserContext>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="carpool" element={<Carpool />} />
          <Route path="chat" element={<ChatHome/>}/>
        </Route>
      </Routes>
      </UserContext>
    </BrowserRouter>
  );
}

