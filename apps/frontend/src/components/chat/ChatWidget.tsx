import React, { useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import NewChatWindow from "./NewChatWindow";
import {
  BasicStorage,
  ChatProvider,
  AutoDraft,
  IStorage,
  UpdateState,
  Presence,
  UserStatus,
  Conversation,
  Participant,
  ConversationRole,
  TypingUsersList,
  ConversationId,
} from "@chatscope/use-chat";
import { ExampleChatService } from "@/utils/chat/ExampleChatService";
import useSessionUser from "@/hook/useSessionUser";
import { Message } from "@/hook/useChatroom";

type ChatWidgetProps = {
  chatroomId?: string;
  messages: Message[];
};

const ChatWidget: React.FC<ChatWidgetProps> = ({ chatroomId, messages }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showChatWindow, setShowChatWindow] = React.useState(false);
  const { sessionUser } = useSessionUser();

  useEffect(() => {
    function handleOutsideChatClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowChatWindow(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideChatClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideChatClick);
    };
  }, [ref]);

  return (
    <>
      <div ref={ref}>
        <NewChatWindow
          visible={showChatWindow}
          chatUser={String(sessionUser.id)}
        />
      </div>
      <div className="absolute bottom-16 right-10 z-10 group">
        <div className="btnTooltip -top-0.5 right-16">Chat</div>
        <ChatBubbleOvalLeftEllipsisIcon
          onClick={() => setShowChatWindow(true)}
          className="text-white h-12 w-12 p-2 cursor-pointer bg-blue-500 rounded-full hover:bg-blue-600 hover:border-2 hover:border-white-500"
        />
      </div>
    </>
  );
};
export default ChatWidget;
