import { useContext, useEffect } from "react";
import { AccountContext } from "../../contexts/AccountContext.jsx";

const useSocketSetup = (setFriendList, setMessages, socket) => {
  const { setUser } = useContext(AccountContext);

  useEffect(() => {
    socket.connect();

    const handleFriends = (friendList) => {
      setFriendList(friendList);
    };

    const handleMessages = (messages) => {
      setMessages(messages);
    };

    const handleDM = (message) => {
      setMessages(prevMsgs => [message, ...prevMsgs]);
    };

    const handleConnected = (status, username) => {
      setFriendList(prevFriends => {
        return prevFriends.map(friend => {
          if (friend.username === username) {
            friend.connected = status;
          }
          return friend;
        });
      });
    };

    const handleConnectError = () => {
      setUser({ loggedIn: false });
    };

    socket.on("friends", handleFriends);
    socket.on("messages", handleMessages);
    socket.on("dm", handleDM);
    socket.on("connected", handleConnected);
    socket.on("connect_error", handleConnectError);

    // Cleanup function
    return () => {
      socket.off("friends", handleFriends);
      socket.off("messages", handleMessages);
      socket.off("dm", handleDM);
      socket.off("connected", handleConnected);
      socket.off("connect_error", handleConnectError);
    };
  }, [setUser, setFriendList, setMessages, socket]);
};

export default useSocketSetup;
