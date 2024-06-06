import { pool } from '../db/db.js';
import { requireAuth } from './middle.js'; // Ensure this path is correct
import bcrypt from 'bcrypt';


export async function deleteProfile(req, res) {
  const { password } = req.body; // Get password from request body

  try {
    requireAuth(req, res, async () => {
      const { username } = res.locals.token;

      if (!username) {
        return res.status(400).json({ message: 'Username is required' });
      }

      if (!password) {
        return res.status(400).json({ message: 'Password is required' });
      }

      // Get the current password hash from the database
      const getPasswordQuery = 'SELECT password FROM users WHERE username = $1';
      const passwordResult = await pool.query(getPasswordQuery, [username]);
      
      if (passwordResult.rowCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const currentPassword = passwordResult.rows[0].password;
      const passwordMatch = await bcrypt.compare(password, currentPassword);

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Incorrect  password' });
      }

      // Start a transaction
      await pool.query('BEGIN');

      // Find the user ID based on the username
      const userQuery = 'SELECT id FROM users WHERE username = $1';
      const userResult = await pool.query(userQuery, [username]);
      
      if (userResult.rowCount === 0) {
        await pool.query('ROLLBACK');
        return res.status(404).json({ message: 'User not found' });
      }

      const userId = userResult.rows[0].id;

      // Delete related records from notifications and other related tables
      const deleteNotificationsQuery = 'DELETE FROM notifications WHERE user_id = $1';
      await pool.query(deleteNotificationsQuery, [userId]);

      const deleteCarpoolQuery = 'DELETE FROM carpool WHERE provider_id = $1';
      await pool.query(deleteCarpoolQuery, [userId]);

      const deleteRatingsQuery = 'DELETE FROM ratings WHERE provider_id = $1';
      await pool.query(deleteRatingsQuery, [userId]);

      const deleteFeedbackQuery = 'DELETE FROM feedback WHERE provider_id = $1';
      await pool.query(deleteFeedbackQuery, [userId]);

      const deletePaymentQuery = 'DELETE FROM payment WHERE user_id = $1';
      await pool.query(deletePaymentQuery, [userId]);

      const deleteBusQuery = 'DELETE FROM Reservation_bus WHERE Utilisateur_ID = $1';
      await pool.query(deleteBusQuery, [userId]);

      const deleteTrainQuery = 'DELETE FROM Reservation_train WHERE Utilisateur_ID = $1';
      await pool.query(deleteTrainQuery, [userId]);

      const deletecarpoolResQuery = 'DELETE FROM Reservation_carpool WHERE Utilisateur_ID = $1';
      await pool.query(deletecarpoolResQuery , [userId]);

      const deletecarpoolReqQuery = 'DELETE FROM booking_request WHERE client_id  = $1';
      await pool.query(deletecarpoolReqQuery, [userId]);

      const deletecarpoolReq1Query = 'DELETE FROM booking_request WHERE  owner_id  = $1';
      await pool.query(deletecarpoolReq1Query, [userId]);

      // Finally, delete the user
      const deleteUserQuery = 'DELETE FROM users WHERE id = $1';
      const result = await pool.query(deleteUserQuery, [userId]);

      if (result.rowCount === 0) {
        await pool.query('ROLLBACK');
        return res.status(404).json({ message: 'User not found' });
      }

      // Commit the transaction
      await pool.query('COMMIT');

      res.status(200).json({ message: 'User deleted successfully from all tables' });
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    await pool.query('ROLLBACK');
    console.error('Error deleting user profile:', error);
    res.status(500).json({ message: 'Error deleting user profile' });
  }
}
