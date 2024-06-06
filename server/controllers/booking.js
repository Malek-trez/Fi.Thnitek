import { pool } from '../db/db.js';
import { requireAuth } from './middle.js';

// Function to create a booking request
export async function createBookingRequest(req, res) {
    try {
        await requireAuth(req, res, async () => {
            const { username } = res.locals.token;
            const quer = 'SELECT * FROM users WHERE username = $1';
            const result = await pool.query(quer, [username]);
            

            let user;
            if (result.rows && result.rows.length > 0) {
                user = result.rows[0];
            } else {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            const { carpool_id, owner_id } = req.body;

            const query = `INSERT INTO booking_request (carpool_id, client_id, owner_id, status) 
                           VALUES ($1, $2, $3, 'pending') RETURNING id`;
            const values = [carpool_id, user.id, owner_id];
            const { rows } = await pool.query(query, values);
           

            res.status(201).json({ bookingRequestId: rows[0].id });
        });
    } catch (error) {
        console.error('Error creating booking request:', error);
        res.status(500).json({ error: 'Failed to create booking request' });
    }
}
export async function getPendingRequests(req, res) {
    try {
        await requireAuth(req, res, async () => {

            const { username } = res.locals.token;
            const userQuery = 'SELECT * FROM users WHERE username = $1';
            const userResult = await pool.query(userQuery, [username]);
            let user;
            if (userResult.rows && userResult.rows.length > 0) {
                user = userResult.rows[0];
            } else {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            const query = `
                SELECT booking_request.*, users.username AS client_username,
                CONCAT(carpool.depart, ' to ', carpool.destination) AS carpool_name
                FROM booking_request
                INNER JOIN users ON booking_request.client_id = users.id
                INNER JOIN carpool ON booking_request.carpool_id = carpool.id
                WHERE booking_request.owner_id = $1 AND booking_request.status = 'pending'
            `;
            const values = [user.id];
            const { rows } = await pool.query(query, values);
            res.status(200).json({ pendingRequests: rows });
        });

    } catch (error) {
        console.error('Error fetching pending requests:', error);
        res.status(500).json({ error: 'Failed to fetch pending requests' });
    }
}



export async function updateBookingRequestStatus(req, res) {
    try {
        await requireAuth(req, res, async () => {
            const { requestId, status } = req.body;
            const { username } = res.locals.token;
            const quer = 'SELECT * FROM users WHERE username = $1';
            const result = await pool.query(quer, [username]);
            let user;
            if (result.rows && result.rows.length > 0) {
                user = result.rows[0];
            } else {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            const query = `UPDATE booking_request SET status = $1 
                           WHERE id = $2 AND owner_id = $3 RETURNING *`;
            const values = [status, requestId, user.id];
            const { rows } = await pool.query(query, values);

            if (rows.length > 0) {
                res.status(200).json({ updatedRequest: rows[0] });
            } else {
                res.status(404).json({ error: 'Request not found or not authorized' });
            }
        });
    } catch (error) {
        console.error('Error updating booking request status:', error);
        res.status(500).json({ error: 'Failed to update booking request status' });
    }
}
