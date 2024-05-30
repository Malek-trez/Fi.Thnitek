import { pool } from '../db/db.js';

export async function Carpool_user(req, res) {
    try {
        const client = await pool.connect();
        const query = `
        SELECT carpool.*, users.username AS provider_name
        FROM carpool
        JOIN users ON carpool.provider_id = users.id
        Where users.id=1
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

