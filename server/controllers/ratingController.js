// controllers/ratingController.js
import { pool } from '../db/db.js';
import { requireAuth } from './middle.js'; // Ensure this middleware checks for authentication

export async function submitRating(req, res) {
  try {
    // Ensure authentication
    requireAuth(req, res, async () => {
      const { username } = res.locals.token;
      const { provider_id, rating, feedback } = req.body;
      
      // Insert the new rating
      const insertRatingQuery = 'INSERT INTO ratings (provider_id, rating,username) VALUES ($1, $2,$3)';
      await pool.query(insertRatingQuery, [provider_id, rating,username]);

      // Insert the new feedback
      const insertFeedbackQuery = 'INSERT INTO feedback (provider_id, feedback,username) VALUES ($1, $2,$3)';
      await pool.query(insertFeedbackQuery, [provider_id, feedback,username]);

      res.status(200).json({ success: true, message: 'Rating and feedback submitted successfully' });
    });
  } catch (error) {
    console.error("Error processing the rating submission: " + error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
