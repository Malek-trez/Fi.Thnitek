import { pool } from '../db/db.js';
import { requireAuth } from './middle.js'; // Assuming middle.js contains the requireAuth middleware

export async function getNotification(req, res) {
    try {
        requireAuth(req, res, async () => {
            const { userId } = res.locals.token;
            const selectQuery = 'SELECT * FROM notifications WHERE user_id = $1'; // Assuming notifications are fetched by user ID

            // Fetch notifications
            const { rows: notifications } = await pool.query(selectQuery, [userId]);

            // Send notifications to the client
            res.json(notifications);
        });
    } catch (error) {
        console.error("Error querying the database: " + error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}