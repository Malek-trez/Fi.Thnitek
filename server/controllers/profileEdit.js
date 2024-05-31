import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from '../db/db.js'; // Import the database connection

const secretKey = 'your_secret_key';

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
}

// Controller for handling user update 
// Controller for handling user update 

export async function profileEdit(req, res) {
  const { name, phone, email,photo, password, newPassword  } = req.body;
  console.log(req.body);
  console.log(name);
  try {
    let updatedUser = { rows: [] }; // Initialiser updatedUser à une valeur par défaut
    const id = 2; // Remplacez ceci par l'ID de l'utilisateur que vous souhaitez mettre à jour

    if (password && newPassword) {
      const getPasswordQuery = 'SELECT password FROM users WHERE id = $1';
      const passwordResult = await pool.query(getPasswordQuery, [id]);
      const currentPassword = passwordResult.rows[0].password;
      const passwordMatch = await bcrypt.compare(password, currentPassword);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Incorrect current password' });
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 12);
       if(photo){
      const updateUserQuery = 'UPDATE users SET username = $1, phone = $2, email = $3, password = $4, imageurl=$5 WHERE id = $6';
      updatedUser = await pool.query(updateUserQuery, [name, phone, email, hashedPassword,photo, id]);
       }
      else{
      const updateUserQuery = 'UPDATE users SET username = $1, phone = $2, email = $3, password = $4 WHERE id = $5';
      updatedUser = await pool.query(updateUserQuery, [name, phone, email, hashedPassword,id]);
    }
      const token = updatedUser.rows.length > 0 ? generateToken(updatedUser.rows[0]) : '';

      res.status(201).json({ token });
 }

    else if (!newPassword) {
      return res.status(400).json({ message: 'please enter new password' });

      
    } else if (!Password) {
      
    
      return res.status(400).json({ message: 'please enter your password' });

    }
   // const token = updatedUser.rows.length > 0 ? generateToken(updatedUser.rows[0]) : '';
  }
   // res.status(201).json({ token });
  catch (err) {
    console.error("Error updating user profile: ", err);
    res.status(500).json({ message: err.message || 'Erreur de mise à jour' });
  }

}