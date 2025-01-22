import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const subscribeToNewComments = (callback) => {
  socket.on("new_comment", callback);

  return () => {
    socket.off("new_comment", callback);
  };
};
