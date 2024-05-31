import { pool } from '../db/db.js';
import { requireAuth } from './middle.js'; // Assuming middle.js contains the requireAuth middleware

export async function updateNotificationStatus(req, res) {
    try {
        requireAuth(req, res, async () => {
            const { userId } = res.locals.token;
            const updateQuery = 'UPDATE notifications SET status = $1 WHERE user_id = $2 AND status = $3';

            // Update status to 'read' for fetched notifications
            const { rowCount } = await pool.query(updateQuery, ['read', userId, 'unread']);

            // No response needed
        });
    } catch (error) {
        console.error("Error updating notification status: " + error.message);
    }
}