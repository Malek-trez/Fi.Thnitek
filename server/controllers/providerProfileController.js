// providerProfileController.js
import { pool } from '../db/db.js';
import { requireAuth } from './middle.js'; // Assuming middle.js contains the requireAuth middleware

export async function getProviderProfile(req, res) {
    try {
        // Call requireAuth middleware to ensure authentication
        requireAuth(req, res, async () => {
            const { provider_id } = req.params; // Get provider_id from URL parameters
            const query = `
            SELECT 
                u.*, 
                ROUND(COALESCE(AVG(r.rating), 0), 2) AS average_rating, 
                ARRAY(
                    SELECT 
                        json_build_object(
                            'username', f.username, 
                            'feedback', f.feedback
                        ) 
                    FROM 
                        feedback f 
                    WHERE 
                        f.provider_id = $1
                ) AS feedback
                FROM 
                users u
                LEFT JOIN 
                ratings r ON u.id = r.provider_id
                WHERE 
                u.id = $1
                GROUP BY 
                u.id;

          `;
          
            const { rows } = await pool.query(query, [provider_id]);
            //console.log(rows);

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
