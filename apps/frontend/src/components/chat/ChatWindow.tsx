import { useTheme } from "@/hook/ThemeContext";
import React from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

import { useChatroom } from "@/hook/useChatroom";

type ChatWindowProps = {
  visible: boolean;
  chatUserId: number;
  chatroomId: string;
};

const ChatWindow: React.FC<ChatWindowProps> = ({
  visible,
  chatUserId,
  chatroomId,
}) => {
  const opacity = "opacity-100";
  const zIndex = "z-20";
  const { messages, handleSubmit } = useChatroom(chatroomId, chatUserId);

  const handleSend = (text: string) => {
    handleSubmit(text);
  };

  if (!visible) {
    return <></>;
  }

  return (
    <div className={`chatWindow ${zIndex} ${opacity}`}>
      <MainContainer responsive>
        <ChatContainer>
          <MessageList>
            {messages.map((message) => (
              <Message
                key={message.id}
                model={{
                  message: message.content,
                  sender: String(message.uid),
                  direction: chatUserId === message.uid ? "outgoing" : "incoming",
                  position: 1,
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            onSend={handleSend}
            attachButton={false}
            autoFocus={true}
            fancyScroll={true}
            placeholder="Type message here"
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};
export default ChatWindow;
