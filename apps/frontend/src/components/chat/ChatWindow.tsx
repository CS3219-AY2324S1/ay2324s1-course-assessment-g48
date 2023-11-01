import ChatConfig from "@/components/chat/ChatConfig";
import React, { useEffect, useState } from "react";
import { Chatbot, createChatBotMessage, createClientMessage } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import { useTheme } from "@/hook/ThemeContext";
import ChatValidator from "@/utils/chat/ChatValidator";
import Avatar from "./Avatar";
import ChatHeader from "./ChatHeader";
import { chatroomSocket } from "@/utils/socket/socket";
import useSessionUser from "@/hook/useSessionUser";
import { IMessage } from "react-chatbot-kit/build/src/interfaces/IMessages";

const BotAvatar = () => <Avatar />;
function createChatHeader(header: string) {
  const ChatHeaderComponent = () => <ChatHeader header={header} />;
  ChatHeaderComponent.displayName = "ChatHeader";
  return ChatHeaderComponent;
}

type ChatWindowProps = {
  visible: boolean;
  sessionId?: string;
  botAvatar?: any;
};

interface Message {
  id: string;
  uid: number;
  content: string;
  timestamp: Date;
}


// https://fredrikoseberg.github.io/react-chatbot-kit-docs/docs/
const ChatWindow: React.FC<ChatWindowProps> = ({ visible }) => {
  const opacity = "opacity-100";
  const zIndex ="z-20";
  const { isDarkMode } = useTheme();
  const chatTheme = isDarkMode ? "dark-chat" : "";
  const { sessionUser } = useSessionUser();

  // TODO: get chatroomId from sessionId
  const chatroomId = "652fbe20f50edb9867beb9c0";
  // TODO: get other user's name from chatroomId
  const testUser = "Person Name";

  // can remove testMessages when done testing
  // ChatBotMessage is other user's message
  // ClientMessage is your message
  const testMessages = [createChatBotMessage("first message", {}), createClientMessage("second message", {})];
  const [messages, setMessages] = useState<IMessage[]>(testMessages); 


  useEffect(() => {
    chatroomSocket.connect();
    chatroomSocket.on("receiveMessage", ({ messages }) => {
      console.log(messages);
      const updatedMessages = messages.map((message: Message) => {
        const isUser = message.uid === sessionUser.id;
        if (isUser) {
          return createClientMessage(message.content, {});
        }
        return createChatBotMessage(message.content, {});
      });
      setMessages((pastMessages) => [...pastMessages, ...updatedMessages]);
    });
    chatroomSocket.emit("connectToChatroom", { chatroomId });
    return () => {
      chatroomSocket.disconnect();
    };
  }, [sessionUser.id]);

  const CustomConfig = {
    ...ChatConfig,
    botName: testUser,
    customComponents: {
      header: createChatHeader(testUser),
      botAvatar: BotAvatar
    },
  };
  if (!visible) {
    return <></>
  }

  return (
    <div className={`chatWindow ${zIndex} ${opacity} ${chatTheme}`}>
      <Chatbot
        config={CustomConfig}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
        validator={ChatValidator}
        messageHistory={messages}
      />
    </div>
  );
};

export default ChatWindow;