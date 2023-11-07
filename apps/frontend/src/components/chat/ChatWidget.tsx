import React, { useEffect, useRef } from "react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import ChatWindow from "./ChatWindow";

import useSessionUser from "@/hook/useSessionUser";
type ChatWidgetProps = {
  chatroomId?: string;
};

const ChatWidget: React.FC<ChatWidgetProps> = ({ chatroomId }) => {
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
        <ChatWindow
          visible={showChatWindow}
          chatUserId={sessionUser.id}
          chatroomId={chatroomId!}
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
