import { pool } from '../db/db.js'; // Import the database connection

// Function to check if the offers table exists
async function checkOffersTableExists() {
  try {
    // Query to check if the offers table exists in the database
    const checkTableQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables 
        WHERE table_name = 'offers'
      )
    `;
    const { rows } = await pool.query(checkTableQuery);
    return rows[0].exists;
  } catch (err) {
    console.error('Error checking offers table:', err);
    throw err;
  }
}

// Function to create the offers table if it doesn't exist
async function createOffersTable() {
  try {
    // Check if the offers table already exists
    const tableExists = await checkOffersTableExists();

    // If the table doesn't exist, create it
    if (!tableExists) {
      const createTableQuery = `
      CREATE TABLE offers (
        id SERIAL PRIMARY KEY,
        depart VARCHAR NOT NULL,
        destination VARCHAR NOT NULL,
        schedule TIMESTAMP NOT NULL,
        price DECIMAL DEFAULT 0,
        capacity INTEGER NOT NULL
      );    
      `;
      await pool.query(createTableQuery);
      console.log('Offers table created successfully.');
    } else {
      console.log('Offers table already exists.');
    }
  } catch (err) {
    console.error('Error creating offers table:', err);
    throw err;
  }
}

// Controller for handling adding offers
export async function addOffer(req, res) {
  const { depart, destination, schedule, price, capacity } = req.body;

  try {
    // Ensure that the offers table exists
    await createOffersTable();

    // Create a new offer and store it in the database
    const insertOfferQuery = 'INSERT INTO offers(depart, destination, schedule, price, capacity) VALUES ($1, $2, $3, $4, $5) RETURNING id';
    const newOffer = await pool.query(insertOfferQuery, [depart, destination, schedule, price, capacity]);

    res.status(201).json({ message: 'Offer added successfully', offerId: newOffer.rows[0].id });
  } catch (err) {
    res.status(500).json({ message: 'Error adding new offer', error: err });
  }
}