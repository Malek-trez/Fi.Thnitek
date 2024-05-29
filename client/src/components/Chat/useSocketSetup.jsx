import { useContext, useEffect } from "react";
import { AccountContext } from "../../contexts/AccountContext.jsx";

const useSocketSetup = (setFriendList, setMessages, socket) => {
  const { setUser } = useContext(AccountContext);

  useEffect(() => {
    if (!socket) return;

    console.log("Connecting socket...");
    socket.connect();

    socket.on("friends", friendList => {
      setFriendList(friendList);
    });

    socket.on("messages", messages => {
      console.log("Received messages:", messages);
      setMessages(messages);
    });

    socket.on("dm", message => {
      console.log("DM:", message);
      setMessages(prevMsgs => [message, ...prevMsgs]);
    });

    socket.on("connected", (status, username) => {
      setFriendList(prevFriends => {
        return [...prevFriends].map(friend => {
          if (friend.username === username) {
            friend.connected = status;
          }
          return friend;
        });
      });
    });

    socket.on("connect_error", () => {
      console.log("Socket connection error");
      // setUser({ loggedIn: false });
    });

    return () => {
      console.log("Disconnecting socket...");
      socket.off("connect_error");
      socket.off("connected");
      socket.off("friends");
      socket.off("messages");
      socket.off("dm");
    };
  }, [socket, setUser, setFriendList, setMessages]);
};

export default useSocketSetup;
