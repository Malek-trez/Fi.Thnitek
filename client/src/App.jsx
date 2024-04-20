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
import UserContext, {AccountContext} from "./contexts/AccountContext.jsx";
import Views from "./components/Views.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <UserContext>
                <Views/>
            </UserContext>
        </BrowserRouter>
    );
}

