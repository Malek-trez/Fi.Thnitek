import pg from 'pg';
import express from 'express';

const { Client } = pg;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => res.send('Hello World!'));

app.get('/api/get', async (req, res) => {
  try {
    const response = await client.query(`SELECT datname FROM pg_database`);
    
    if(response){
      res.status(200).send(response.rows);
    }
    
  } catch (error) {
    res.status(500).send('Error');
    console.log(error);
  } 
});


app.listen(3000, () => console.log(`App running on port 3000.`));