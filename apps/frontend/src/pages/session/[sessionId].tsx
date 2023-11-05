import { useRouter } from "next/router";
import useQuestionById from "@/hook/useQuestionById";
import { useEffect, useState } from "react";
import useSessionUser from "@/hook/useSessionUser";
import {
  AutoDraft,
  BasicStorage,
  ChatProvider,
  Conversation,
  ConversationId,
  ConversationRole,
  IStorage,
  Participant,
  Presence,
  TypingUsersList,
  UpdateState,
  User,
  UserStatus,
} from "@chatscope/use-chat";
import { nanoid } from "nanoid";
import { ExampleChatService } from "@/utils/chat/ExampleChatService";
import { languageOptions } from "@/utils/constants/LanguageOptions";
import QuestionWorkspace from "@/components/questions/questionPage/QuestionWorkspace";
import { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { Doc } from "@automerge/automerge/next";
import axios from "axios";
import { getUserById } from "@/database/user/userService";
import { Message, useChatroom } from "@/hook/useChatroom";

export default function Session() {
  const router = useRouter();

  const { sessionUser } = useSessionUser();
  const [accessToken, setAccessToken] = useState(sessionUser.accessToken);
  const [refreshToken, setRefreshToken] = useState(sessionUser.refreshToken);
  const sessionID = useRouter().query.sessionId as string;
  const questionId = "6544a293176b84aafd37817a"; // hardcoded, to be changed
  const { question } = useQuestionById(questionId, accessToken, refreshToken);
  const languageSelected = languageOptions[0]; // hardcoded, to be changed
  //   const [chatUsers, setChatUsers] = useState<number[]>([]);
  const [docUrl, setDocUrl] = useState<AutomergeUrl>();
  const [doc, changeDoc] = useDocument<Doc>(docUrl);
  const [chatroomId, setChatroomId] = useState<string>("");
  let increment: (value: string) => void = (value: string) => {
    console.log("reflecting changes in code editor through changeDoc...");
    changeDoc((d) => (d.text = value));
  };

  useEffect(() => {
    console.log(sessionID);
    setAccessToken(sessionUser.accessToken);
    setRefreshToken(sessionUser.refreshToken);
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

  const conversationId = nanoid();

  function createConversation(
    id: ConversationId,
    uids: number[]
  ): Conversation {
    return new Conversation({
      id,
      participants: uids.map(
        (uid) =>
          new Participant({
            id: String(uid),
            role: new ConversationRole([]),
          })
      ),
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

  const [users, setUsers] = useState<number[]>([]);

  useEffect(() => {
    users.forEach((userId: number) => {
      console.log(`Adding ${userId}`);
      chatStorage.addUser({
        id: String(userId),
        presence: new Presence({
          status: UserStatus.Available,
          description: "",
        }),
        firstName: "",
        lastName: "",
        username: "test",
        email: "",
        avatar: "",
        bio: "",
      });
    });
    createConversation(
      conversationId,
      users.filter((id: number) => id != sessionUser.id)
    );
  }, [users]);

  const { messages } = useChatroom(chatroomId, sessionUser.id);

  useEffect(() => {
    if (sessionID) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SESSION_URL}/session/get-session/${sessionID}`
        )
        .then((res) => {
          console.log(res.data.docId);
          console.log(res.data.chatroomId);
          console.log("docId received");
          setDocUrl(res.data.docId);
          setChatroomId(res.data.chatroomId);
          setUsers(res.data.users);
        })
        .catch((err) => {
          console.log(err);
          router.push("/404");
        });
    }
  }, [sessionID]);

  return (
    <ChatProvider
      serviceFactory={serviceFactory}
      storage={chatStorage}
      config={{
        typingThrottleTime: 250,
        typingDebounceTime: 900,
        debounceTyping: true,
        autoDraft: AutoDraft.Save | AutoDraft.Restore,
      }}
    >
      <div>
        {question && (
          <QuestionWorkspace
            question={question}
            doc={doc}
            increment={increment}
            initialLanguage={languageSelected}
            messages={messages}
          />
        )}
      </div>
    </ChatProvider>
  );
}
