import { io } from "socket.io-client";

const socket = user =>
  new io(import.meta.env.VITE_SOCKETIO_SERVER_URL, {
      autoConnect: false,
      withCredentials: true,
      auth: {
          token: user.token,
      },
  });

export default socket;
