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

      // Delete related records from notifications and other related tables
      const deleteNotificationsQuery = 'DELETE FROM notifications WHERE id = (SELECT id FROM users WHERE username = $1)';
      await pool.query(deleteNotificationsQuery, [username]);

      const deleteCarpoolQuery = 'DELETE FROM carpool WHERE id = (SELECT id FROM users WHERE username = $1)';
      await pool.query(deleteCarpoolQuery, [username]);

      // Finally, delete the user
      const deleteUserQuery = 'DELETE FROM users WHERE username = $1';
      const result = await pool.query(deleteUserQuery, [username]);

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
