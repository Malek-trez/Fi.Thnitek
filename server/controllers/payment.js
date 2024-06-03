import { createPayment, insertPayment } from './paymentRepository.js';
import { requireAuth } from './middle.js';
import { pool } from '../db/db.js';

export async function payment(req, res) {
    try {
        // Use requireAuth middleware to ensure user is authenticated
        await requireAuth(req, res, async () => {
            const { username } = res.locals.token;
            const query = 'SELECT * FROM users WHERE username = $1';
            const { rows } = await pool.query(query, [username]);

            if (rows.length > 0) {
                const user = rows[0];

                const paymentData = req.body;
                const paymentResult = await createPayment(paymentData);
                const paymentId = await insertPayment(paymentData, paymentResult.status, user.id);
                const paymentInfo = {
                    id: paymentId.id,
                    amount: paymentResult.amount,
                    description: paymentResult.description,
                    status: paymentResult.status,
                };
                return res.json(paymentInfo);
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};
