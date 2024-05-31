import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import SignUp from "./signup.jsx";
import Login from "./Login.jsx";
import Carpool from "./carpool.jsx";
//import ChatHome from "./Chat/ChatHome.jsx";
import {AccountContext} from "../contexts/AccountContext.jsx";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AddOffer from "./Offers.jsx";
import SearchBarTrain from "./Train/Train.jsx";
import Rating from "./rating.jsx";
import ChatHome from "./Chat/ChatHome.jsx";
import Profile from "./Profile.jsx";
import UserOffers from "./UserOffers.jsx";
import Team from "./Team.jsx";
import ContactUs from "./ContactUs.jsx";

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
                <Route path="team" element={<Team/>}/>
                <Route path="chat" element={<ChatHome/>}/>
                <Route path="contact" element={<ContactUs/>}/>
                <Route path="offers" element={<AddOffer />} />
                <Route path="train" element={<SearchBarTrain/>}/>
                <Route path="rating" element={<Rating/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="Myoffers" element={<UserOffers/>}/>
            </Route>
        </Routes>
        )
}

export default Views;