import redisClient from "../../redis.js";
import addFriend from "./addFriend.js";
import parseFriendList from "./parseFriendList.js";

const initializeUser = async socket => {
  socket.join(String(socket.user.userId));
//  console.log("User ", socket.user.username, " is member of room: ", String(socket.user.userId));
  await redisClient.hset(
    `userId:${socket.user.username}`,
    "userId",
    socket.user.userId,
    "connected",
    true
  );

  const friendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  const parsedFriendList = await parseFriendList(friendList);
  const friendRooms = parsedFriendList.map(friend => friend.userId);

  if (friendRooms.length > 0)
    socket.to(friendRooms).emit("connected", true, socket.user.username);

  socket.emit("friends", parsedFriendList);

  const msgQuery = await redisClient.lrange(
    `chat:${socket.user.userId}`,
    0,
    -1
  );

  // to.from.content
  const messages = msgQuery.map(msgStr => {
    const parsedStr = msgStr.split(".");
    return { to: parsedStr[0], from: parsedStr[1], content: parsedStr[2] };
  });

  if (messages && messages.length > 0) {
    socket.emit("messages", messages);
  }
  //console.log("done initializing ", socket.user.username);
};

export default initializeUser;
