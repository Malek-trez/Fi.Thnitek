import { pool } from '../db/db.js';

export async function allCarpool(req, res) {
    try {
        const client = await pool.connect();
        const query = `
        SELECT carpool.*, users.username AS provider_name, users.imageUrl AS provider_image
        FROM carpool
        JOIN users ON carpool.provider_id = users.id
        ORDER BY carpool.id`;
       const result = await client.query(query);
       //const result = await client.query('SELECT * FROM carpool ORDER BY id');
        const carpools = result.rows;
        client.release(); 
        res.status(200).json({
            status: "success",
            results: carpools.length,
            data: {
              carpools,
            },
          });
        } catch (err) {
          console.log(err);
        }
}

// Fetch the carpool from the database
const getCarpoolFromDatabase = async (client, id) => {
  const carpool = await client.query('SELECT * FROM carpool WHERE id = $1', [id]);
  return carpool.rows[0];
};

// Delete the carpool from the database
const deleteCarpoolFromDatabase = async (client, id) => {
  await client.query('DELETE FROM carpool WHERE id = $1', [id]);
};

// Update the carpool in the database
const updateCarpoolIn = async (client, carpool) => {
  await client.query('UPDATE carpool SET capacity = $1 WHERE id = $2', [carpool.capacity, carpool.id]);
};

export const onBookNow = async (req, res) => {
  const client = await pool.connect();
  const id = req.body.id;

  try {
      // Fetch the carpool from the database
      let carpool = await getCarpoolFromDatabase(client, id);

      // Decrement the capacity
      if (carpool.capacity > 0) {
          carpool.capacity--;
      }

      // Update the carpool in the database regardless of its capacity
      await updateCarpoolIn(client, carpool);

      res.send({ success: true, carpool });
  } catch (error) {
      console.error(error);
      res.status(500).send({ success: false });
  } finally {
      client.release();
  }
}
// Update the carpool in the database
const updateCarpoolOut = async (client, carpool) => {
  await client.query('UPDATE carpool SET capacity = $1 WHERE id = $2', [carpool.capacity, carpool.id]);
};

export const cancelBookNow = async (req, res) => {
  const { Reservation_ID } = req.params;
  const client = await pool.connect();

  try {
    const result = await client.query('DELETE FROM reservation_carpool WHERE Reservation_ID = $1', [Reservation_ID]);

    if (result.rowCount === 0) {
      return res.status(404).send({ message: 'No booking found with the provided ID.' });
    }

    res.status(200).send({ message: 'Booking cancelled successfully.' });
  } catch (error) {
    res.status(500).send({ message: 'Error cancelling booking.', error });
  } finally {
    client.release();
  }
}
export async function searchByDestination(req, res) {
  try {
    const { destination } = req.query;
    const query = 'SELECT * FROM carpool WHERE lower(destination) ILIKE $1 ORDER BY id';
    const client = await pool.connect();
    const result = await client.query(query, [`%${destination}%`]); // Add % wildcards
    let carpools = result.rows;
    carpools = carpools.map(carpool => {
      const date = new Date(carpool.schedule);
      const formattedDate = date.toISOString().split('T')[0];
      const formattedTime = date.toTimeString().split(' ')[0];
      carpool.schedule = `${formattedDate} ${formattedTime}`;
      return carpool;
    });
    client.release(); 
    
    res.status(200).json({
      status: "success",
      results: carpools.length,
      data: {
        carpools,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

export async function searchByDepart(req, res) {
  try {
    const { depart } = req.query;
    const query = 'SELECT * FROM carpool WHERE lower(depart) ILIKE $1 ORDER BY id';
    const client = await pool.connect();
    const result = await client.query(query, [`%${depart}%`]); // Add % wildcards
    const carpools = result.rows;
    client.release(); 
    
    res.status(200).json({
      status: "success",
      results: carpools.length,
      data: {
        carpools,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

export async function searchByPrice(req, res) {
  try {
    const { price } = req.query;
    const query = 'SELECT * FROM carpool WHERE price = $1 ORDER BY id';
    const client = await pool.connect();
    const result = await client.query(query, [price]);
    const carpools = result.rows;
    client.release(); 
    
    res.status(200).json({
      status: "success",
      results: carpools.length,
      data: {
        carpools,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}



export async function Booking_Carpool(req, res) {
  try {
    const { destination, departure, temps_depart, Date_depart, Utilisateur_ID, Nombre_reservation, prix } = req.body;

    // Validate the data (you can add more validation if needed)
    if (!destination || !departure || !temps_depart || !Date_depart || !Nombre_reservation || !prix) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert the reservation into the database
    const query = 'INSERT INTO reservation_carpool (Destination, Depart, Temps_depart, Date_depart, Utilisateur_ID, Nombre_reservation, Prix) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [destination, departure, temps_depart, Date_depart, Utilisateur_ID, Nombre_reservation, prix];
    await pool.query(query, values);

    // Respond with success
    res.status(201).json({ message: 'Reservation saved successfully' });
  } catch (error) {
    console.error('Error saving reservation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


// Get Booking Details
export async function getCarpoolBookings(req, res) {
try {
  const result = await pool.query('SELECT *, \'carpool\' as type FROM reservation_carpool');
  res.json(result.rows);
} catch (error) {
  console.error('Error fetching carpool bookings:', error);
  res.status(500).json({ error: 'Internal server error' });
}
};
