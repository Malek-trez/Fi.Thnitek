//carpoll_user.js
import { pool } from '../db/db.js';
import { requireAuth } from './middle.js';

export async function Carpool_user(req, res) {
  try {
      requireAuth(req, res, async () => {
          const { username } = res.locals.token;
          const query = 'SELECT id FROM users WHERE username = $1';
          const { rows } = await pool.query(query, [username]);

          if (rows.length > 0) {
              const user = rows[0];
              const client = await pool.connect();
              const carpoolQuery = `
                  SELECT carpool.*, users.username AS provider_name
                  FROM carpool
                  JOIN users ON carpool.provider_id = users.id
                  WHERE users.id = $1
                  ORDER BY carpool.id`;
              const result = await client.query(carpoolQuery, [user.id]);
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
          } else {
              res.status(404).json({ error: 'User not found' });
          }
      });
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

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
