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


export async function deleteCarpoolFromDB(req, res) {
  try {
      const id = req.body.id;
      const client = await pool.connect();
      const query='DELETE FROM carpool WHERE id = $1'
      const result = await client.query(query,[id]);

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
        console.log(err)
        res.status(500).json({ message: 'Error Deleting offer', error: err });
      }
}

export async function UpdateCarpoolOffer(req, res) {
  try {
      const {carpoolid, depart, destination, schedule, price, capacity} = req.body;
      const client = await pool.connect();
      const query=`
      UPDATE carpool SET depart = $1,
          destination = $2,
          schedule = $3,
          price = $4,
          capacity = $5
      WHERE id = $6`;
      await client.query(query,[depart, destination, schedule, price, capacity, carpoolid]);
      client.release(); 
      res.status(200).json({ message: 'Carpool offer updated successfully' });

      } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error updating carpool offer', error: err });
      }
}