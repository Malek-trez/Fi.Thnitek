// controllers/ratingController.js
import { pool } from '../db/db.js';
import { requireAuth } from './middle.js'; // Ensure this middleware checks for authentication

export async function submitRating(req, res) {
  try {
    // Ensure authentication
    requireAuth(req, res, async () => {
      const { provider_id, rating, feedback } = req.body;
      
      // Insert the new rating
      const insertRatingQuery = 'INSERT INTO ratings (provider_id, rating) VALUES ($1, $2)';
      await pool.query(insertRatingQuery, [provider_id, rating]);

      // Insert the new feedback
      const insertFeedbackQuery = 'INSERT INTO feedback (provider_id, feedback) VALUES ($1, $2)';
      await pool.query(insertFeedbackQuery, [provider_id, feedback]);

      res.status(200).json({ success: true, message: 'Rating and feedback submitted successfully' });
    });
  } catch (error) {
    console.error("Error processing the rating submission: " + error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
