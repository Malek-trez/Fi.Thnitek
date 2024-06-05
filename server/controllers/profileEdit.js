import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from '../db/db.js'; 
import { requireAuth } from './middle.js';

const secretKey = 'your_secret_key';

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
}

// Controller for handling user update 

export async function profileEdit(req, res) {
  const { name, phone, email,password, newPassword,avatar } = req.body;
  console.log(req.body);
  console.log(name);
  console.log(avatar);
 
  try {
    requireAuth(req, res, async () => {
    const { username } = res.locals.token;
    let updatedUser = { rows: [] }; // Initialiser updatedUser à une valeur par défaut
    const getIDQuery = 'SELECT id FROM users WHERE username= $1';
    const idResult = await pool.query(getIDQuery, [username]);
    const id =idResult.rows[0].id;
    console.log(id);

    if (password ) {
      const getPasswordQuery = 'SELECT password FROM users WHERE username = $1';
      const passwordResult = await pool.query(getPasswordQuery, [username ]);
      const currentPassword = passwordResult.rows[0].password;
      const passwordMatch = await bcrypt.compare(password, currentPassword);

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Incorrect current password' });
      }
      if(avatar){
      const updateUserQuery = 'UPDATE users SET username = $1, phone = $2, email = $3, imageurl=$4 WHERE id = $5';
      updatedUser = await pool.query(updateUserQuery, [name, phone, email, avatar, id]);
       }
      else{
        const updateUserQuery = 'UPDATE users SET username = $1, phone = $2, email = $3 WHERE id = $4';
        updatedUser = await pool.query(updateUserQuery, [name, phone, email,id]);
      }
      const token = updatedUser.rows.length > 0 ? generateToken(updatedUser.rows[0]) : '';
      res.status(201).json({ token });
    }

    else if (password && newPassword) {
      const getPasswordQuery = 'SELECT password FROM users WHERE username = $1';
      const passwordResult = await pool.query(getPasswordQuery, [username ]);
      const currentPassword = passwordResult.rows[0].password;
      const passwordMatch = await bcrypt.compare(password, currentPassword);

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Incorrect current password' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      if(avatar){
      const updateUserQuery = 'UPDATE users SET username = $1, phone = $2, email = $3, password = $4, imageurl=$5 WHERE id = $6';
      updatedUser = await pool.query(updateUserQuery, [name, phone, email, hashedPassword,avatar, id]);
       }
      else{
        const updateUserQuery = 'UPDATE users SET username = $1, phone = $2, email = $3, password = $4 WHERE id = $5';
        updatedUser = await pool.query(updateUserQuery, [name, phone, email, hashedPassword,id]);
      }
      const token = updatedUser.rows.length > 0 ? generateToken(updatedUser.rows[0]) : '';
      res.status(201).json({ token });
    }
  
    else if (!password) {
      return res.status(400).json({ message: 'please enter your password' });
    }
  });}
  
  catch (err) {
    console.error("Error updating user profile: ", err);
    res.status(500).json({ message: err.message || 'Erreur de mise à jour' });
  }

}