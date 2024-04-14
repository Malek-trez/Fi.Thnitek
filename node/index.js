// index.js

import express from 'express';
import { login } from './controller/login.js';
import { allCarpool , onBookNow} from './controller/carpool.js';
import cors from 'cors';

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
app.get("/api/carpool",allCarpool);

//route for reservation of carpool
app.put('/api/carpool/book',onBookNow);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
