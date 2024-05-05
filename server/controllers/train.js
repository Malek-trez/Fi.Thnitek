import { pool } from '../db/db.js';



// get All trips // voyage
export async function allTrips(req, res) {
  try {
    const allData = await pool.query('SELECT * FROM "Voyage_train"');
    res.json(allData.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}



// Get all Countries//ville
export async function allCountries(req, res) {
  try {
    const allData = await pool.query('SELECT * FROM "Ville"');
    res.json(allData.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

// Get all Stops 
export async function allStops(req, res) {
  try {
    const { query } = req.query;
    const filteredCountries = await pool.query('SELECT * FROM "Arret"');
    res.json(filteredCountries.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

// Search for availabe trips
export async function SearchTrainTrips(req, res) {
  try {
    const { destination, departure ,hour} = req.params;
    const Data = await pool.query('SELECT a1."Ville_ID" AS destination, a1."Date_Arret", a2."Ville_ID" AS departure, a2."Date_Sortie" FROM "Arret" a1 JOIN "Arret" a2 ON a1."Voyage_ID" = a2."Voyage_ID" WHERE a1."Ville_ID" = $1 AND a1."Date_Arret" is NOT null AND a2."Ville_ID" = $2 and a2."Date_Sortie" is NOT NULL and a2."Arret_ID"<a1."Arret_ID" and EXTRACT(HOUR FROM a2."Date_Sortie")>= $3 ORDER BY EXTRACT(HOUR FROM a2."Date_Sortie") ASC',[destination,departure,hour]);
    res.json(Data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

