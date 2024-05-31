import express from 'express';
import cors from 'cors';
import { login } from './controllers/login.js';
import { allCarpool, onBookNow ,cancelBookNow,searchByDestination,searchByDepart,searchByPrice} from './controllers/carpool.js';
import { signup } from './controllers/signup.js';
import { test } from './controllers/testdb.js';
import {payment} from './controllers/payment.js';
import {getPayments} from './controllers/paymentRepository.js';

import { Carpool_user } from './controllers/carpool_user.js';
import { deleteCarpoolFromDB } from './controllers/carpool_user.js';
import { UpdateCarpoolOffer } from './controllers/carpool_user.js';

import { Server } from "socket.io";
import addFriend from "./controllers/socketio/addFriend.js"
import initializeUser from "./controllers/socketio/initializeUser.js";
import onDisconnect from "./controllers/socketio/onDisconnect.js";
import authorizeUser from "./controllers/socketio/authorizeUser.js";
import { addOffer } from './controllers/offer.js';
import { allCountries ,allStops, allTrips, SearchTrainTrips , Booking_Train} from './controllers/train.js';
import dm from "./controllers/socketio/dm.js";
import http from "http";
import handleLogin from "./controllers/socketio/handleLogin.js";

import { getProfile } from  './controllers/profile.js';

import { getProviderProfile } from './controllers/providerProfileController.js'; 
import { submitRating } from './controllers/ratingController.js';
import { getNotification } from './controllers/notification.js';
import {updateNotificationStatus} from './controllers/updateNotificationStatus.js';

import { getProfilee } from './controllers/ProfilePage.js';
import { profileEdit} from './controllers/profileEdit.js';
import { deleteProfile} from './controllers/profiledel.js';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  }
});
// Middleware to parse JSON bodies
app.use(express.json());

// Route for testing the API
app.get('/api/testdata', test);

// Route for user login
app.post('/api/login', login);

// Route for payment
app.post('/api/payment', payment);
app.get('/api/payments', getPayments);


// Route for user sign up
app.post("/api/signup", signup);

app.get("/api/login", handleLogin);

// Get a users carpool
app.get("/api/carpool_user", Carpool_user);
// Route Delete a carpool
app.put('/api/carpool_user/delete', deleteCarpoolFromDB);
// Route Delete a carpool
app.post('/api/carpool_user/update', UpdateCarpoolOffer);

// Get all carpool
app.get("/api/carpool", allCarpool);
// Route for booking a carpool
app.put('/api/carpool/book', onBookNow);
// Route cancel a booked carpool
app.put('/api/carpool/cancel', cancelBookNow);
//route pour search
app.get('/api/carpool/searchByDestination',searchByDestination);

app.get('/api/carpool/searchByDepart',searchByDepart);

app.get('/api/carpool/searchByPrice',searchByPrice);

// Route for offers adding
app.post('/api/AddOffer', addOffer);

// Get all Trips 
app.get('/api/voyage', allTrips);

// Get all countries 
app.get('api/ville', allCountries);

// Get all stops
app.get('/Arret', allStops);

// Search for available trips 
app.get('/Arret/:destination/:departure/:hour', SearchTrainTrips);

// Booking Details
app.post('/train/Bookings',Booking_Train);

// Mount the profile route
app.get('/api/profile',  getProfile);

// Route to get provider profile by provider_id
app.get('/api/users/:provider_id', getProviderProfile);


// Route to submit rating and feedback
app.post('/api/rating', submitRating);

// Route to get notifications
app.get('/api/notifications', getNotification);

// Route to update notification status
app.post('/api/changeNotifStatus', updateNotificationStatus);

app.post('/api/profileEdit', profileEdit);
app.get('/api/profilepage', getProfilee);
app.post('/api/profiledel', deleteProfile);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

io.use(authorizeUser);
io.on("connect", socket => {
  initializeUser(socket);

  socket.on("add_friend", (friendName, cb) => {
    addFriend(socket, friendName, cb);
  });

  socket.on("dm", message => dm(socket, message));

  socket.on("disconnecting", () => onDisconnect(socket));
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
