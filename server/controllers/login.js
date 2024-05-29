import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from '../db/db.js'; // Import the database connection

// Secret key for JWT token
const secretKey = process.env.JWT_SECRET;

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
}

// Controller for handling user login
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Query the database to fetch user details based on username
    const query = 'SELECT * FROM users WHERE username = $1';
    const { rows } = await pool.query(query, [username]);

    if (rows.length === 1) {
      // User found, compare hashed password
      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Password matches, generate JWT token
        const token = generateToken(user);
        // Include username in the response
        console.log("user",user.username);
        res.json({username: user.username , role: user.role ,loggedIn: true, token });
      } else {
        // Password doesn't match
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      // User not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
