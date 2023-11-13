import { chatroomSocket } from "@/utils/socket/socket";
import {
  useState,
  useEffect,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import { useError } from "./ErrorContext";

export interface Message {
  id: string;
  uid: number;
  content: string;
  timestamp: Date;
}

export const useChatroom = (chatroomId: string, userId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { setError, clearError } = useError();
  useEffect(() => {
    if (chatroomId && chatroomId.length != 0) {
      setMessages([]);
      chatroomSocket.connect();
      chatroomSocket.on("receiveMessage", ({ messages }) => {
        setMessages((pastMessages) => [...pastMessages, ...messages]);
        // messages.forEach((message: Message) => {
        //   callback(message);
        // });
      });
      chatroomSocket.emit("connectToChatroom", { chatroomId });

      chatroomSocket.on("other user connecting", () => {
        clearError();
        setError({
          type: 4,
          message: "Another user has connected.",
        });
      });

      chatroomSocket.on("other user disconnecting", () => {
        clearError();
        setError({
          type: 4,
          message: "A user has disconnected.",
        });
      });

      return () => {
        console.log("disconnecting chat");
        chatroomSocket.emit("starting to disconnect");
        chatroomSocket.disconnect();
      };
    }
  }, [chatroomId]);

  const handleSubmit = (message: string) => {
    chatroomSocket.emit("sendMessage", {
      uid: userId,
      content: message,
      timestamp: new Date(),
    });
    console.log("HELLO");
  };

  return { messages, handleSubmit };
};
