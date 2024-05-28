import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import SignUp from "./signup.jsx";
import Login from "./login.jsx";
import Carpool from "./carpool.jsx";
import ChatHome from "./Chat/ChatHome.jsx";
import {AccountContext} from "../contexts/AccountContext.jsx";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AddOffer from "./Offers.jsx";
import SearchBarTrain from "./Train/Train.jsx";
import Rating from "./rating.jsx";

const Views = () => {
    const {user} = useContext(AccountContext);
    return user.loggedIn !== null &&
        (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="signup" element={<SignUp/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="carpool" element={<Carpool/>}/>
                <Route path="chatHome" element={<ChatHome/>}/>
                <Route path="offers" element={<AddOffer />} />
                <Route path="train" element={<SearchBarTrain/>}/>
                <Route path="rating" element={<Rating/>}/>
            </Route>
        </Routes>
        )
}

export default Views;