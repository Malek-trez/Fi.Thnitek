
import {pool} from '../db/db.js';

const SECRET_KEY  = 'sk_test_51P84gTJev0bjP9UuzmkZr0Rmc3On6KqnnuvnFKH63Q41kYdPqBOQPKPgD1fKghoVUaYQ9SwhchCtvPhn1hwv9326005uVgaQ7J'
import Stripe from 'stripe';

const stripe = new Stripe(SECRET_KEY);




export async function createPayment(paymentData) {
    return stripe.customers.create({
        email: paymentData.email,
        source: paymentData.token,
        name: paymentData.name,
        //address: paymentData.address,
    }).then((customer) => {
        return stripe.charges.create({
            amount: paymentData.amount,
            description: paymentData.description,
            currency: paymentData.currency,
            customer: customer.id,
        }).then((charge) => {
            return {
                id: charge.id,
                amount: charge.amount,
                description: charge.description,
                status: charge.status,
            }
        })
    })
}




export async function insertPayment(paymentData, status, userId) {
    const connection = await pool.getConnection();
    console.log("Database connection established");
    try {
        // Check if the payment table exists
        const [tableExistsRows, _] = await connection.execute(
            `SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_schema = ? AND table_name = ?`,
            [pool.config.connectionConfig.database, 'payment']
        );
        const tableExists = tableExistsRows[0].count > 0;

        if (!tableExists) {
            throw new Error('Payment table does not exist');
        }

        // Insert payment data into the payment table
        const [rows, fields] = await connection.execute(
            'INSERT INTO payment (amount, description, status, email, name, token, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [paymentData.amount, paymentData.description, status, paymentData.email, paymentData.name, paymentData.token, userId]
        );

        const paymentId = rows.insertId;
        return { id: paymentId };
    } catch (error) {
        throw error;
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
}




