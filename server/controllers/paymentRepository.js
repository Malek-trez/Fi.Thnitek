import { pool } from '../db/db.js';
import Stripe from 'stripe';
import { requireAuth } from './middle.js';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createPayment(paymentData) {
    const amountInCents = parseFloat(paymentData.amount) * 100; // Convert to integer (cents)

    return stripe.customers.create({
        email: paymentData.email,
        source: "tok_visa",
        name: paymentData.Name,
        //address: paymentData.address,
    }).then((customer) => {
        return stripe.charges.create({
            amount: amountInCents,
            description: "carpool"+paymentData.carpoolId.toString(), // Ensure it's a string
            currency: "usd",
            customer: customer.id,
        }).then((charge) => {
            return {
                id: charge.id,
                amount: charge.amount,
                description: charge.description,
                status: charge.status,
            };
        });
    });
}

export async function insertPayment(paymentData, status, userId) {
    try {
        // Insert payment data into the payment table using pool.query()
        const query = `
            INSERT INTO payment (amount, description, status, email, name, token, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;
        const values = [
            paymentData.amount,
            "carpool:"+paymentData.carpoolId.toString(),
            status,
            paymentData.email,
            paymentData.Name,
            "tok_visa",
            userId,
        ];

        const { rows } = await pool.query(query, values);
        const paymentId = rows[0].id;

        return { id: paymentId };
    } catch (error) {
        throw error;
    }
}



export async function getPayments(req, res) {
    try {
        await requireAuth(req, res, async () => {
            const { username } = res.locals.token;
            const queryUser = 'SELECT * FROM users WHERE username = $1';
            const { rows: userRows } = await pool.query(queryUser, [username]);

            if (userRows.length > 0) {
                const user = userRows[0];

                // Fetch payment history data from the database
                const queryPayment = 'SELECT * FROM payment WHERE user_id = $1 ORDER BY created_at DESC';
                const userId = user.id; 
                const { rows: paymentRows } = await pool.query(queryPayment, [userId]);
                const payments = paymentRows;
            
                // Send the payment history data in the response
                res.json({ payments });
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        });    
    } catch (error) {
        console.error('Error fetching payment history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
