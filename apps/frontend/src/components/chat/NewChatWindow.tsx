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
import {
  useChat,
  ChatMessage,
  MessageContentType,
  MessageDirection,
  MessageStatus,
  MessageContent,
  TextContent,
  User
} from "@chatscope/use-chat";

type NewChatWindowProps = {
  visible: boolean;
  chatUser: User;
};

const NewChatWindow: React.FC<NewChatWindowProps> = ({ visible, chatUser }) => {
  const opacity = "opacity-100";
  const zIndex = "z-20";
  const { isDarkMode } = useTheme();
  const chatTheme = isDarkMode ? "dark-chat" : "";

  const {
    currentMessages,
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    getUser,
    currentMessage,
    setCurrentMessage,
    sendTyping,
    setCurrentUser,
  } = useChat();

  useEffect(() => {
    setCurrentUser(chatUser);
  }, [chatUser, setCurrentUser]);

  if (!activeConversation && conversations.length > 0) {
    console.log(conversations[0].id);
    setActiveConversation(conversations[0].id);
    console.log(activeConversation);
  }

  const [currentUserName] = useMemo(() => {
    if (activeConversation) {
      const participant =
        activeConversation.participants.length > 0
          ? activeConversation.participants[0]
          : undefined;

      if (participant) {
        const user = getUser(participant.id);
        if (user) {
          return [user.username];
        }
      }
    }
    return [undefined, undefined];
  }, [activeConversation, getUser]);



  const getTypingIndicator = useCallback(() => {
    if (activeConversation) {
      const typingUsers = activeConversation.typingUsers;

      if (typingUsers.length > 0) {
        const typingUserId = typingUsers.items[0].userId;

        // Check if typing user participates in the conversation
        if (activeConversation.participantExists(typingUserId)) {
          const typingUser = getUser(typingUserId);

          if (typingUser) {
            return (
              <TypingIndicator content={`${typingUser.username} is typing`} />
            );
          }
        }
      }
    }

    return undefined;
  }, [activeConversation, getUser]);

  const handleChange = (value: string) => {
    // Send typing indicator to the active conversation
    // You can call this method on each onChange event
    // because sendTyping method can throttle sending this event
    // So typing event will not be send to often to the server
    setCurrentMessage(value);
    if (activeConversation) {
      sendTyping({
        conversationId: activeConversation?.id,
        isTyping: true,
        userId: chatUser.id,
        content: value, // Note! Most often you don't want to send what the user types, as this can violate his privacy!
        throttle: true,
      });
    }
  };

  const handleSend = (text: string) => {
    const message = new ChatMessage({
      id: "", // Id will be generated by storage generator, so here you can pass an empty string
      content: text as unknown as MessageContent<TextContent>,
      contentType: MessageContentType.TextHtml,
      senderId: chatUser.id,
      direction: MessageDirection.Outgoing,
      status: MessageStatus.Sent,
    });

    if (activeConversation) {
      sendMessage({
        message,
        conversationId: activeConversation.id,
        senderId: chatUser.id,
      });
      console.log("conversations", conversations);
    }
  };

  if (!visible) {
    return <></>;
  }

  return (
    <div className={`chatWindow ${zIndex} ${opacity} ${chatTheme}`}>
      <MainContainer responsive>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Content userName={currentUserName} />
          </ConversationHeader>
          <MessageList typingIndicator={getTypingIndicator()}>
            {currentMessages.map((g) => (
              <MessageGroup key={g.id} direction={g.direction}>
                <MessageGroup.Messages>
                  {g.messages.map((m: ChatMessage<MessageContentType>) => (
                    <Message
                      key={m.id}
                      model={{
                        type: "html",
                        payload: m.content,
                        direction: m.direction,
                        position: "normal",
                      }}
                    />
                  ))}
                </MessageGroup.Messages>
              </MessageGroup>
            ))}
          </MessageList>
          <MessageInput
            value={currentMessage}
            onChange={handleChange}
            onSend={handleSend}
            attachButton={false}
            placeholder="Type message here"
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};
export default NewChatWindow;
