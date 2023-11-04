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

type ChatWidgetProps = {
  chatroomId?: string;
};

const ChatWidget: React.FC<ChatWidgetProps> = ({ chatroomId }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showChatWindow, setShowChatWindow] = React.useState(false);
  const { sessionUser } = useSessionUser();

  // const { messages, handleSubmit } = useChatroom(
  //   chatroomId!,
  //   sessionUser.id,
  // );

  // Chat user class
  // export declare class User<UserData = any> {
  //   readonly id: UserId;
  //   presence: Presence;
  //   firstName: string;
  //   lastName: string;
  //   username: string;
  //   email: string;
  //   avatar: string;
  //   bio: string;
  //   data?: UserData;
  //   constructor({ id, presence, firstName, lastName, username, email, avatar, bio, data, }: UserParams);
  // }

  const chatUser = {
    id: `${sessionUser.id}`,
    presence: new Presence({ status: UserStatus.Available, description: "" }),
    firstName: "",
    lastName: "",
    username: sessionUser.username ?? "",
    email: "",
    avatar: "",
    bio: "",
  };

  const testUser = {
    id: "1",
    presence: new Presence({ status: UserStatus.Available, description: "" }),
    firstName: "",
    lastName: "",
    username: "test",
    email: "",
    avatar: "",
    bio: "",
  };

  function createConversation(id: ConversationId, uid: string): Conversation {
    return new Conversation({
      id,
      participants: [
        new Participant({
          id: uid,
          role: new ConversationRole([]),
        }),
      ],
      unreadCounter: 0,
      typingUsers: new TypingUsersList({ items: [] }),
      draft: "",
    });
  }

  // Storage needs to generate id for messages and groups
  const messageIdGenerator = () => nanoid();
  const groupIdGenerator = () => nanoid();

  // Create serviceFactory
  const serviceFactory = (storage: IStorage, updateState: UpdateState) => {
    return new ExampleChatService(storage, updateState);
  };

  const chatStorage = new BasicStorage({
    groupIdGenerator,
    messageIdGenerator,
  });

  chatStorage.addUser(chatUser);
  chatStorage.addUser(testUser);

  const conversationId = nanoid();

  chatStorage.addConversation(createConversation(conversationId, testUser.id));

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
        <NewChatWindow visible={showChatWindow} chatUser={chatUser} />
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
