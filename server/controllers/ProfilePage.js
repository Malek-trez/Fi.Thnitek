
import { pool } from '../db/db.js';
import { requireAuth } from './middle.js'; 

export async function getProfilee(req, res) {
       
       const userId = 2; // Supposons que vous stockez l'ID de l'utilisateur dans la session

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

