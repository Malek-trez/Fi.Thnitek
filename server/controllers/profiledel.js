import { pool } from '../db/db.js';
import { requireAuth } from './middle.js';

export async function deleteProfile(req, res) {
  try {
    requireAuth(req, res, async () => {
      const { username } = res.locals.token;
      console.log(username);

      if (!username) {
        return res.status(400).json({ message: 'User ID is required' });
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

      const deleteratingsQuery = 'DELETE FROM ratings WHERE provider_id = $1';
      await pool.query(deleteratingsQuery, [userId]);

      const deletefeedbackQuery = 'DELETE FROM feedback WHERE provider_id = $1';
      await pool.query(deletefeedbackQuery, [userId]);

      const deletepaymentQuery = 'DELETE FROM payment WHERE user_id = $1';
      await pool.query(deletepaymentQuery, [userId]);

      const deletebusQuery = 'DELETE FROM Reservation_bus WHERE  Utilisateur_ID = $1';
      await pool.query(deletebusQuery, [userId]);

      const deletetrainQuery = 'DELETE FROM Reservation_train WHERE  Utilisateur_ID = $1';
      await pool.query(deletetrainQuery, [userId]);

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
