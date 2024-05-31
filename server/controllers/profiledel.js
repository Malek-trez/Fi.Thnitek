import { pool } from '../db/db.js';

export async function deleteProfile(req, res) {
  try {
  

    const { username } = res.locals.token;
    // Vérifier que l'ID utilisateur est fourni
    if (!username ) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Exécuter la requête de suppression
    const delQuery = 'DELETE FROM users WHERE username = $1';
    const result = await pool.query(delQuery, [username ]);

    // Vérifier si l'utilisateur a été supprimé
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Si la suppression est réussie, renvoyer un message de succès
    res.status(200).json({ message: 'User deleted successfully' });

  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).json({ message: 'Error deleting user profile' });
  }
}