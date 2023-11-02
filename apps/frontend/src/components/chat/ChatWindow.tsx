import ChatConfig from "@/components/chat/ChatConfig";
import React from "react";
import {
  Chatbot,
  createChatBotMessage,
  createClientMessage,
} from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import { useTheme } from "@/hook/ThemeContext";
import ChatValidator from "@/utils/chat/ChatValidator";
import Avatar from "./Avatar";
import ChatHeader from "./ChatHeader";
import { useChatroom } from "@/hook/useChatroom";
import useSessionUser from "@/hook/useSessionUser";

const BotAvatar = () => <Avatar />;
function createChatHeader(header: string) {
  const ChatHeaderComponent = () => <ChatHeader header={header} />;
  ChatHeaderComponent.displayName = "ChatHeader";
  return ChatHeaderComponent;
}

type ChatWindowProps = {
  visible: boolean;
  botAvatar?: any;
  chatroomId: string;
};

// https://fredrikoseberg.github.io/react-chatbot-kit-docs/docs/
const ChatWindow: React.FC<ChatWindowProps> = ({ visible, chatroomId }) => {
  const opacity = "opacity-100";
  const zIndex = "z-20";
  const { isDarkMode } = useTheme();
  const chatTheme = isDarkMode ? "dark-chat" : "";

  const testUser = "Person Name";

  const { messages, handleSubmit } = useChatroom(chatroomId);
  const { sessionUser } = useSessionUser();

  const CustomConfig = {
    ...ChatConfig,
    botName: testUser,
    customComponents: {
      header: createChatHeader(testUser),
      botAvatar: BotAvatar,
    },
    state: {
      handleSubmit: handleSubmit
    },
  };

  const iMessages = messages.map((message) =>
    sessionUser.id == message.uid
      ? createClientMessage(message.content, {})
      : createChatBotMessage(message.content, {})
  );

  if (!visible) {
    return <></>;
  }

  return (
    <div className={`chatWindow ${zIndex} ${opacity} ${chatTheme}`}>
      <Chatbot
        config={CustomConfig}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
        validator={ChatValidator}
        messageHistory={iMessages}
      />
    </div>
  );
};

export default ChatWindow;
