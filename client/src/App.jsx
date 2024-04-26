import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
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

