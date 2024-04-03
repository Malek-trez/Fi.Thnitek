// login.js

import jwt from "jsonwebtoken"

// Secret key for JWT token
const secretKey = 'your_secret_key';

// Static user data for demonstration
const staticUser = {
  id: 1,
  username: 'testuser',
  password: 'testpassword'
};

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
}

// Controller for handling user login
export function login(req, res) {
  const { username, password } = req.body;

  // For demonstration, checking against static user data
  if (username === staticUser.username && password === staticUser.password) {
    // Generate JWT token
    const token = generateToken(staticUser);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
}
