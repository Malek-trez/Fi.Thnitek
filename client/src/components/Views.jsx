import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import SignUp from "./signup.jsx";
import Login from "./Login.jsx";
import Carpool from "./carpool.jsx";
import {AccountContext} from "../contexts/AccountContext.jsx";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AddOffer from "./Offers.jsx";
import SearchBarTrain from "./Train/Train.jsx";
import Rating from "./rating.jsx";
import Paymentform from "./Payment.jsx";
import ChatHome from "./Chat/ChatHome.jsx";
import Profile from "./Profile.jsx";
import UserOffers from "./UserOffers.jsx"
import PaymentHistory from "./history.jsx";
import ProfilePage from "./ProfilePage.jsx";
import Notification from "./Notification.jsx";
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
             
                <Route path="chat" element={<ChatHome/>}/>
               
                <Route path="offers" element={<AddOffer />} />
                <Route path="train" element={<SearchBarTrain/>}/>
                <Route path="rating/:provider_id" element={<Rating/>}/>
                <Route path="payment" element={<Paymentform/>}/>
                <Route path="history" element={<PaymentHistory/>}/>

                <Route path="profile" element={<Profile/>}/>

                <Route path="Myoffers" element={<UserOffers/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="notifications" element={<Notification/>}/>
                <Route path="profilepage" element={<ProfilePage />} />
            </Route>
        </Routes>
        )
}

export default Views;
