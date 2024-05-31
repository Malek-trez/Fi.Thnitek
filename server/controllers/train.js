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

// Booking Details
 export async function Booking_Train(req, res){
  try {
    const { destination, departure, temps_depart, Date_depart, Utilisateur_ID, Nombre_reservation, prix } = req.body;

    // Validate the data (you can add more validation if needed)
    if (!destination || !departure || !temps_depart || !Date_depart || !Nombre_reservation || !prix) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Insert the reservation into the database
    const query = 'INSERT INTO reservation_train (Destination, Depart, Temps_depart, Date_depart,Utilisateur_ID, Nombre_reservation,Prix) VALUES ($1, $2, $3, $4, $5, $6,$7)';
    const values = [destination, departure, temps_depart, Date_depart, Utilisateur_ID, Nombre_reservation, prix];
    await pool.query(query, values);

    // Respond with success
    res.status(201).json({ message: 'Reservation saved successfully' });
  } catch (error) {
    console.error('Error saving reservation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



 

