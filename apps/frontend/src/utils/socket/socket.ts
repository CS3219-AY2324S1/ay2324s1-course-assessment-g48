import { io } from "socket.io-client";

export const matchingSocket = io("localhost:8001", {
  transports: ["websocket"],
  timeout: 10000,
});
