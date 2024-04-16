// index.js

import express from 'express';
import { login } from './controllers/login.js';
import { allCarpool, onBookNow } from './controllers/carpool.js';
import { signup } from './controllers/signup.js';
import { test } from './controllers/testdb.js';
import cors from 'cors';
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

// Route for user sign up
app.post("/api/signup", signup);

// Get all carpool
app.get("/api/carpool", allCarpool);

// Route for testing the API
app.get('/api/testdata', test);

// Route for booking a carpool
app.put('/api/carpool/book', onBookNow);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
