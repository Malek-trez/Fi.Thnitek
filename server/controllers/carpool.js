import { pool } from '../db/db.js';

export async function allCarpool(req, res) {
  console.log(res.locals.token.username);
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

export const onBookNow=  async (req, res) => {
  const client = await pool.connect();
  const id = req.body.id;

  try {
      // Fetch the carpool from the database
      let carpool = await getCarpoolFromDatabase(client, id);

      // Decrement the capacity
      carpool.capacity--;

      // If the capacity is zero, delete the carpool
      if (carpool.capacity === 0) {
          await deleteCarpoolFromDatabase(client, id);
      } else {
          // Otherwise, update the carpool in the database
          await updateCarpoolIn(client, carpool);
      }

      res.send({ success: true });
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
  const client = await pool.connect();
  const id = req.body.id;

  try {
    // Fetch the carpool from the database
    let carpool = await getCarpoolFromDatabase(client, id);

    // Increment the capacity
    carpool.capacity++;

    // Update the carpool in the database
    await updateCarpoolOut(client, carpool);

    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false });
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