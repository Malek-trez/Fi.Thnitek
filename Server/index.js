// index.js

import express from 'express';
import { login } from './controller/login.js';


const app = express();
const PORT = process.env.PORT || 3000;



// Middleware to parse JSON bodies
app.use(express.json());

// Route for user login
app.post('/api/login', login);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
