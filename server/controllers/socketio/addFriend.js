import redisClient from "../../redis.js";

const addFriend = async (socket, friendName, cb) => {
  if (friendName === socket.user.username) {
    cb({ done: false, errorMsg: "Cannot add self!" });
    return;
  }
  const friend = await redisClient.hgetall(`userId:${friendName}`);
  const currentFriendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  if (!friend.userId) {
    cb({ done: false, errorMsg: "User doesn't exist!" });
    return;
  }
  if (
    currentFriendList &&
    currentFriendList.indexOf(`${friendName}.${friend.userId}`) !== -1
  ) {
    cb({ done: false, errorMsg: "Friend already added!" });
    return;
  }

  await redisClient.lpush(
    `friends:${socket.user.username}`,
    [friendName, friend.userId].join(".")
  );

  const newFriend = {
    username: friendName,
    userId: friend.userId,
    connected: friend.connected,
  };
  cb({ done: true, newFriend });
};

export default addFriend;
