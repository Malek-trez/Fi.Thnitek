import redisClient from "../../redis.js";
import { pool } from "../../db/db.js"; 
// Assuming your database connection is exported from db.js

const dm = async (socket, message) => {
  message.from = String(socket.user.userId);
  
  // Format the message string
  const messageString = [message.to, message.from, message.content].join(".");

  // Store the message in Redis
  await redisClient.lpush(`chat:${message.to}`, messageString);
  await redisClient.lpush(`chat:${message.from}`, messageString);

  // Emit the message to the recipient
  socket.to(message.to).emit("dm", message);

  // Store the message as a notification in the database
  const notificationQuery = 'INSERT INTO notifications(user_id, title, message) VALUES ($1, $2, $3)';
  const notificationValues = [message.to, 'New Message!', message.content]; // Example message content

  try {
    await pool.query(notificationQuery, notificationValues);
  } catch (error) {
    console.error('Error storing notification:', error);
  }
};

export default dm;
