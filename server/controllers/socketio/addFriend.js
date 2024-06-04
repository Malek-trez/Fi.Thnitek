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
  const friendFriendList = await redisClient.lrange(
      `friends:${friendName}`,
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
    cb({ done: false, errorMsg: "Connection already added!" });
    return;
  }
  if (
      friendFriendList &&
      friendFriendList.indexOf(`${socket.user.username}.${socket.user.userId}`) !== -1
  ) {
    cb({ done: false, errorMsg: "Connection already added on the other side!" });
    return;
  }

  // Add friend to current user's friend list
  await redisClient.lpush(
      `friends:${socket.user.username}`,
      [friendName, friend.userId].join(".")
  );

  // Add current user to friend's friend list
  await redisClient.lpush(
      `friends:${friendName}`,
      [socket.user.username, socket.user.userId].join(".")
  );

  const newFriend = {
    username: friendName,
    userId: friend.userId,
    connected: friend.connected,
  };
  cb({ done: true, newFriend });
};

export default addFriend;
