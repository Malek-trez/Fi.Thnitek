import { pool } from '../db/db.js';
import stripePackage from 'stripe';
import { requireAuth } from './middle.js';
import 'dotenv/config';






// Insert a new payment into the database
async function insertPayment(amount, description, status, userId) {
    try {
      const query = `INSERT INTO payment (amount, description, status, user_id, created_at) 
                     VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) 
                     RETURNING id`;
      const values = [amount, description, status, userId];
      const { rows } = await pool.query(query, values);
      return rows[0].id;
    } catch (error) {
      console.error('Error inserting payment:', error);
      throw new Error('Failed to insert payment');
    }
  }
  


const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);


export async function createPayment(req, res) {
  try {
    // Use requireAuth middleware to ensure user is authenticated
    await requireAuth(req, res, async () => {
      // Ensure the request body is defined
      if (!req.body) {
        return res.status(400).json({ error: 'Request body is missing' });
      }
      const { username } = res.locals.token;
      const query = 'SELECT * FROM users WHERE username = $1';
      const { rows } = await pool.query(query, [username]);
      let user;
      if (rows.length > 0) {
         user = rows[0];
        } else {
        res.status(404).json({ error: 'User not found' });
    }
      const { type,amount, name, items } = req.body;
      const amountInCents = parseFloat(amount) * 100; // Convert to integer (cents)

      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: items.map(item => {
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: name,
                },
                unit_amount: amountInCents,
              },
              quantity: 1,
            };
          }),
          success_url: `http://localhost:5173/success?type=${type}`,
          cancel_url: `http://localhost:5173/`,
        });


        if (session.payment_status === 'unpaid') {
            
          const paymentId = await insertPayment(amount, name, session.payment_status,user.id);

          res.json({ url: session.url, paymentId: paymentId });
        } else {
          res.json({ url: session.url });
        }
      } catch (e) {
        console.error('Error creating payment session:', e);
        res.status(500).json({ error: e.message });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
export const getPayments = async (req, res) => {
  try {
    await requireAuth(req, res, async () => {
      const { username } = res.locals.token;

      const queryUser = 'SELECT id FROM users WHERE username = $1';
      const userResult = await pool.query(queryUser, [username]);

      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const userId = userResult.rows[0].id;

      const queryPayments = 'SELECT id, amount, description, status, created_at FROM payment WHERE user_id = $1 ORDER BY created_at DESC';
      const paymentsResult = await pool.query(queryPayments, [userId]);

      res.status(200).json({ payments: paymentsResult.rows });
    });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ error: 'Failed to fetch payment history' });
  }
};

      

      
  


