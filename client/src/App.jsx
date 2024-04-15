import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Login  from "./components/login";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Carpool from "./components/carpool";
import SignUp from "./components/signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="carpool" element={<Carpool />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

