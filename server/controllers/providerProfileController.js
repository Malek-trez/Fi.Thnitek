// providerProfileController.js
import { pool } from '../db/db.js';
import { requireAuth } from './middle.js'; // Assuming middle.js contains the requireAuth middleware

export async function getProviderProfile(req, res) {
    try {
        // Call requireAuth middleware to ensure authentication
        requireAuth(req, res, async () => {
            const { provider_id } = req.params; // Get provider_id from URL parameters
            const query = 'SELECT * FROM users WHERE id = $1';
            const { rows } = await pool.query(query, [provider_id]);

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
