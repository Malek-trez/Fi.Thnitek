
import { pool } from '../db/db.js';
  

export async function getProfilee(req, res) {
       
       const userId = 2; // Supposons que vous stockez l'ID de l'utilisateur dans la session

        try {
          // Vérifiez d'abord si l'utilisateur est connecté et récupérez son ID de session ou toute autre méthode d'authentification que vous utilisez
      
         // if (!userId) {
        //    return res.status(401).json({ message: "User not authenticated" });
         // }
      
          // Ensuite, utilisez l'ID de l'utilisateur pour récupérer ses informations de profil à partir de votre base de données
          const util = await pool.query('SELECT username, phone, email,imageurl FROM users WHERE id = $1', [userId] );
          const user=util.rows[0];
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
         // Si tout se passe bien, renvoyez les informations de profil de l'utilisateur
          res.status(200).json({
            id: user.id,
            name: user.username,
            phone: user.phone,
            email: user.email,
            image: user.imageurl,
          });
        } catch (error) {
          console.error("Error fetching user profile:", error);
          res.status(500).json({ message: "Error fetching user profile" });
        }
      }

