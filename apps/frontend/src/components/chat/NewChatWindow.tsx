import { useTheme } from "@/hook/ThemeContext";
import React, { useCallback, useEffect, useMemo } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
  MessageGroup,
} from "@chatscope/chat-ui-kit-react";

import { Message as MessageEntity, useChatroom } from "@/hook/useChatroom";
import useSessionUser from "@/hook/useSessionUser";
import { MessageDirection } from "@chatscope/use-chat";

type NewChatWindowProps = {
  visible: boolean;
  chatUser: string;
  messages: MessageEntity[];
  chatroomId: string;
};

const NewChatWindow: React.FC<NewChatWindowProps> = ({
  visible,
  chatUser,
  chatroomId,
}) => {
  const opacity = "opacity-100";
  const zIndex = "z-20";
  const { isDarkMode } = useTheme();
  const chatTheme = isDarkMode ? "dark-chat" : "";
  const { sessionUser } = useSessionUser();
  const { messages, handleSubmit } = useChatroom(chatroomId, sessionUser.id);

  const handleSend = (text: string) => {
    handleSubmit(text);
  };

  if (!visible) {
    return <></>;
  }

  return (
    <div className={`chatWindow ${zIndex} ${opacity} ${chatTheme}`}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((message) => (
              <Message
                key={message.id}
                model={{
                  message: message.content,
                  sender: message.id,
                  direction: sessionUser.id === message.uid ? MessageDirection.Outgoing : MessageDirection.Incoming,
                  position: 1,
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            //   onChange={handleChange}
            onSend={handleSend}
            placeholder="Type message here"
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};
export default NewChatWindow;
