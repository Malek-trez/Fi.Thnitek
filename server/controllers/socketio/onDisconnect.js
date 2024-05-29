import redisClient from "../../redis.js";
import parseFriendList from "./parseFriendList.js";

const onDisconnect = async socket => {
  await redisClient.hset(
    `userId:${socket.user.username}`,
    "connected",
    false
  );
  const friendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  const friendRooms = await parseFriendList(friendList).then(friends =>
    friends.map(friend => String(friend.userId))
  );
  socket.to(friendRooms).emit("connected", false, socket.user.username);
};

export default onDisconnect;
