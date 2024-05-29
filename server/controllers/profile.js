import { pool } from '../db/db.js';
import { requireAuth } from './middle.js'; // Assuming authMiddleware.js contains the requireAuth middleware

export async function getProfile(req, res) {
    try {
        // Call requireAuth middleware to ensure authentication
        requireAuth(req, res, async () => {
            const { username } = res.locals.token;
            const query = 'SELECT * FROM users WHERE username = $1';
            const { rows } = await pool.query(query, [username]);

            if (rows.length > 0) {
                const user = rows[0];
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        });
    } catch (error) {
        console.error("Error querying the database: " + error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
