import ChatConfig from "@/components/chat/ChatConfig";
import React from "react";
import { Chatbot, createChatBotMessage, createClientMessage } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import { useTheme } from "@/hook/ThemeContext";
import ChatValidator from "@/utils/chat/ChatValidator";
import Avatar from "./Avatar";
import ChatHeader from "./ChatHeader";

const BotAvatar = () => <Avatar />;
function createChatHeader(header: string) {
  const ChatHeaderComponent = () => <ChatHeader header={header} />;
  ChatHeaderComponent.displayName = "ChatHeader";
  return ChatHeaderComponent;
}

type ChatWindowProps = {
  visible: boolean;
  botAvatar?: any;
};

// https://fredrikoseberg.github.io/react-chatbot-kit-docs/docs/
const ChatWindow: React.FC<ChatWindowProps> = ({ visible }) => {
  const opacity = visible ? "opacity-100" : "opacity-0";
  const zIndex = visible ? "z-20" : "z-0";
  const { isDarkMode } = useTheme();
  const chatTheme = isDarkMode ? "dark-chat" : "";

  const testMessages = [createChatBotMessage("first message", {}), createClientMessage("second message", {})];
  const testUser = "Person Name";

  const CustomConfig = {
    ...ChatConfig,
    botName: testUser,
    customComponents: {
      header: createChatHeader(testUser),
      botAvatar: BotAvatar
    },
  };

  return (
    <div className={`chatWindow ${zIndex} ${opacity} ${chatTheme}`}>
      <Chatbot
        config={CustomConfig}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
        validator={ChatValidator}
        messageHistory={testMessages}
      />
    </div>
  );
};

export default ChatWindow;