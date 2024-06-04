import { pool } from '../db/db.js';
// Search for availabe trips
export async function SearchBusTrips(req, res) {
    try {
      const { destination, departure} = req.params;
      const Data = await pool.query('SELECT Sortie, Destination, Temps_Sortie , Temps_arrivé FROM Bus_trips WHERE Destination = $1 AND Sortie =$2 ',[destination,departure]);
      res.json(Data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }

  
  export async function SearchBus(req, res) {
    try {
      const Data = await pool.query('SELECT * from Bus_trips');
      res.json(Data);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
  
  
  // Booking Details
  export async function Booking_Bus(req, res){
    try {
      const { destination, departure, temps_depart, Date_depart, Utilisateur_ID, Nombre_reservation, prix } = req.body;
  
      // Validate the data (you can add more validation if needed)
      if (!destination || !departure || !temps_depart || !Date_depart || !Nombre_reservation || !prix) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Insert the reservation into the database
      const query = 'INSERT INTO reservation_bus (Destination, Depart, Temps_depart, Date_depart,Utilisateur_ID, Nombre_reservation,Prix) VALUES ($1, $2, $3, $4, $5, $6,$7)';
      const values = [destination, departure, temps_depart, Date_depart, Utilisateur_ID, Nombre_reservation, prix];
      await pool.query(query, values);
  
      // Respond with success
      res.status(201).json({ message: 'Reservation saved successfully' });
    } catch (error) {
      console.error('Error saving reservation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Get Booking Details
export async function getBusBookings(req, res) {
  try {
    const result = await pool.query('SELECT *, \'bus\' as type FROM reservation_bus');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching bus bookings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


