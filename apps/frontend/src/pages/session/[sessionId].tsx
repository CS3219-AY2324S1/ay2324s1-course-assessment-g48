import { useRouter } from "next/router";
import SessionQuestionWorkspace from "@/components/questions/questionPage/SessionQuestionWorkspace";
import useQuestionById from "@/hook/useQuestionById";
import { useEffect, useState } from "react";
import useSessionUser from "@/hook/useSessionUser";
import { AutoDraft, BasicStorage, ChatProvider, Conversation, ConversationId, ConversationRole, IStorage, Participant, Presence, TypingUsersList, UpdateState, UserStatus } from "@chatscope/use-chat";
import { nanoid } from "nanoid";
import { ExampleChatService } from "@/utils/chat/ExampleChatService";

export default function Session() {
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser.role);
  const sessionID = useRouter().query.sessionId as string;
  const questionId = "653befbb9797de9bd0b4ba92"; // hardcoded, to be changed
  const { question } = useQuestionById(questionId, userRole);

  useEffect(() => {
    // console.log(sessionID);
    setUserRole(sessionUser.role);
  }, [sessionUser]);

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

  return (
    <ChatProvider
      serviceFactory={serviceFactory}
      storage={chatStorage}
      config={{
        typingThrottleTime: 250,
        typingDebounceTime: 900,
        debounceTyping: true,
        autoDraft: AutoDraft.Save | AutoDraft.Restore,
      }}>
      <div>
        {question && (
          <SessionQuestionWorkspace question={question} sessionId={sessionID} />
        )}
      </div>
    </ChatProvider>
  );
}
