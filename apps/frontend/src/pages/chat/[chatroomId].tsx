import { chatroomSocket } from "@/utils/socket/socket";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

interface Message {
  id: string;
  uid: number;
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const chatroomId = useRouter().query.chatroomId;

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([]);
    chatroomSocket.connect();
    chatroomSocket.on("receiveMessage", ({ messages }) => {
      console.log("Receive message", messages);
      setMessages((pastMessages) => [...pastMessages, ...messages]);
    });
    chatroomSocket.emit("connectToChatroom", { chatroomId });

    console.log(messages);

    return () => {
      chatroomSocket.disconnect();
    };
  }, [chatroomId, messages]);

  const [newMessage, setNewMessage] = useState<string>("");

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    chatroomSocket.emit("sendMessage", {
      uid: 1,
      content: newMessage,
      timestamp: new Date(),
    });
    console.log("HELLO");
    setNewMessage("");
  };

  return (
    <div>
      {messages.map((message, key) => (
        <h1 key={key}>{message.content}</h1>
      ))}
      <form>
        <input onChange={handleInput} value={newMessage}></input>

        <button onClick={handleSubmit} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
