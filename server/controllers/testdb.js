import { pool } from '../db/db.js';

export async function test(req, res) {
  try {
    // Acquire a client from the connection pool
    const client = await pool.connect();

    // Query the list of databases
    const response = await client.query('SELECT datname FROM pg_database');

    // Release the client back to the pool
    client.release();

    // Check if there's a response
    if (response && response.rows.length > 0) {
      // If there are databases, send the list in the response
      res.status(200).send(response.rows);
    } else {
      // If no databases are found, send a 404 error
      res.status(404).send('No databases found');
    }
  } catch (error) {
    // If there's an error, send a 500 error response
    console.error('Error querying databases:', error);
    res.status(500).send('Error');
  }
}
