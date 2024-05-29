import express from 'express';
import { login } from './controllers/login.js';
import { allCarpool, onBookNow ,cancelBookNow,searchByDestination,searchByDepart,searchByPrice} from './controllers/carpool.js';
import { signup } from './controllers/signup.js';
import { test } from './controllers/testdb.js';
import cors from 'cors';
import { Server } from "socket.io";
import addFriend from "./controllers/socketio/addFriend.js"
import initializeUser from "./controllers/socketio/initializeUser.js";
import onDisconnect from "./controllers/socketio/onDisconnect.js";
import authorizeUser from "./controllers/socketio/authorizeUser.js";
import { addOffer } from './controllers/offer.js';
import { allCountries ,allStops, allTrips, SearchTrainTrips } from './controllers/train.js';
import dm from "./controllers/socketio/dm.js";
import http from "http";
import handleLogin from "./controllers/socketio/handleLogin.js";

import { getProfile } from  './controllers/profile.js';

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

// Route for user login
app.post('/api/login', login);

// Route for user sign up
app.post("/api/signup", signup);

app.get("/api/login", handleLogin);

// Get all carpool
app.get("/api/carpool", allCarpool);

// Route for testing the API
app.get('/api/testdata', test);

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

// Mount the profile route
app.get('/api/profile',  getProfile);

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
