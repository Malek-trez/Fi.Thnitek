import { pool } from '../db/db.js'; // Import the database connection

// Function to check if the offers table exists
async function checkOffersTableExists() {
  try {
    // Query to check if the offers table exists in the database
    const checkTableQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables 
        WHERE table_name = 'carpool'
      )
    `;
    const { rows } = await pool.query(checkTableQuery);
    return rows[0].exists;
  } catch (err) {
    console.error('Error checking carpool table:', err);
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
      CREATE TABLE carpool (
        id SERIAL PRIMARY KEY,
        depart VARCHAR NOT NULL,
        destination VARCHAR NOT NULL,
        schedule TIMESTAMP NOT NULL,
        price DECIMAL DEFAULT 0,
        capacity INTEGER NOT NULL,
        provider_id INT NOT NULL,
        CONSTRAINT fk_provider FOREIGN KEY (provider_id) REFERENCES users(id)
    );  `;
      await pool.query(createTableQuery);
      console.log('carpool table created successfully.');
    } else {
      console.log('carpool table already exists.');
    }
  } catch (err) {
    console.error('Error creating carpool table:', err);
    throw err;
  }
}

// Controller for handling adding offers
export async function addOffer(req, res) {
  const { depart, destination, schedule, price, capacity ,provider_id} = req.body;

  try {
    // Ensure that the offers table exists
    await createOffersTable();
    // Create a new offer and store it in the database
    const insertOfferQuery = 'INSERT INTO carpool(depart, destination, schedule, price, capacity, provider_id) VALUES ($1, $2, $3, $4, $5 ,$6) RETURNING id';
    const newOffer = await pool.query(insertOfferQuery, [depart, destination, schedule, price, capacity, provider_id]);
    // Create a notification for adding the offer
    const notificationQuery = 'INSERT INTO notifications(user_id, title, message) VALUES ($1, $2, $3)';
    const notificationValues = [provider_id, 'New Offer Added', 'You have successfully added a new carpool offer.']; // Example message content

    await pool.query(notificationQuery, notificationValues);

    res.status(201).json({ message: 'Offer added successfully', offerId: newOffer.rows[0].id });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Error adding new offer', error: err });
  }
}