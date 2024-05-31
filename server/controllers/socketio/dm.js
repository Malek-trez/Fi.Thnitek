import redisClient from "../../redis.js";

const dm = async (socket, message) => {
  message.from = String(socket.user.userId);
  // to.from.content
  const messageString = [message.to, message.from, message.content].join(
    "."
  );

  await redisClient.lpush(`chat:${message.to}`, messageString);
  await redisClient.lpush(`chat:${message.from}`, messageString);

  //socket.broadcast.emit("messages", [messages[0]]);
  //socket.broadcast.emit("messages", [message]);
  //console.log("[messages[0]]: ", [messages[0]], "message: ", [message]);

  socket.to(message.to).emit("dm", message);

};

export default dm;
