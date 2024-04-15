// index.js

import express from 'express';
import { login } from './controllers/login.js'; // <-- Keep this line from HEAD
import { allCarpool , onBookNow} from './controllers/carpool.js'; // <-- Add this line from emna
import cors from 'cors'; // <-- Add this line from emna
import { Server } from "socket.io";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route for user login
app.post('/api/login', login);

// Get all carpool
app.get("/api/carpool",allCarpool); // <-- Add this route from emna

//route for reservation of carpool
app.put('/api/carpool/book',onBookNow); // <-- Add this route from emna

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
