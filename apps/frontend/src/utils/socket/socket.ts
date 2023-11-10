import { io } from "socket.io-client";

export const matchingSocket = io(String(process.env.NEXT_PUBLIC_WS_URL), {
  path: "/queue",
});

export const chatroomSocket = io(String(process.env.NEXT_PUBLIC_CHAT_URL), {
  path: "/chat",
});
