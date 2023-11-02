import { chatroomSocket } from "@/utils/socket/socket";
import {
  useState,
  useEffect,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";

interface Message {
  id: string;
  uid: number;
  content: string;
  timestamp: Date;
}

export const useChatroom = (chatroomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (chatroomId.length != 0) {
      setMessages([]);
      chatroomSocket.connect();
      chatroomSocket.on("receiveMessage", ({ messages }) => {
        console.log(messages);
        setMessages((pastMessages) => [...pastMessages, ...messages]);
      });
      chatroomSocket.emit("connectToChatroom", { chatroomId });

      console.log(messages);

      return () => {
        chatroomSocket.disconnect();
      };
    }
  }, [chatroomId]);

  const handleSubmit = (message: string) => {
    chatroomSocket.emit("sendMessage", {
      uid: 1,
      content: message,
      timestamp: new Date(),
    });
    console.log("HELLO");
  };

  return { messages, handleSubmit };
};
