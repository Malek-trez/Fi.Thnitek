import { pool } from '../db/db.js';
import Stripe from 'stripe';

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
