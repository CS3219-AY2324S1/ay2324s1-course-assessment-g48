// MatchStateContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { MatchedState } from "@/utils/enums/MatchingState";
import { User } from "@/database/user/entities/user.entity";
import { useError } from "./ErrorContext";
import { matchingSocket } from "@/utils/socket/socket";
import useSessionUser from "./useSessionUser";
import { getUserById } from "@/database/user/userService";
import { Complexity } from "@/utils/enums/Complexity";
import { useRouter } from "next/router";
import { useTimer } from "./timerContext";
import { languageOptions } from "@/utils/constants/LanguageOptions";

type MatchStateContextType = {
  matchState: MatchedState;
  setToMatchedState: (data: any) => void;
  setToNotMatchingState: () => void;
  setToMatchingState: () => void;
  disconnectSocket: () => void;
  disableBtnCancel?: boolean;
  difficulty: Complexity;
  setDifficulty: React.Dispatch<React.SetStateAction<Complexity>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  sessionId: string | undefined;
};

const MatchStateContext = createContext<MatchStateContextType | undefined>(
  undefined
);

export const useMatchState = (): MatchStateContextType => {
  const context = useContext(MatchStateContext);
  if (!context) {
    throw new Error("useMatchState must be used within a MatchStateProvider");
  }
  return context;
};

type MatchStateProviderProps = {
  children: ReactNode;
};

export const MatchStateProvider: React.FC<MatchStateProviderProps> = ({
  children,
}) => {
  const { toggleTimer, reset, isRunning } = useTimer();
  const [matchState, setMatchState] = useState<MatchedState>(() => {
    return isRunning ? MatchedState.MATCHING : MatchedState.NOT_MATCHING;
  });
  const { setError, clearError } = useError();
  const [disableBtnCancel, setDisableBtnCancel] = useState(true);
  const [difficulty, setDifficulty] = useState<Complexity>(Complexity.Easy);
  const [language, setLanguage] = useState<string>(languageOptions[0].label);
  const [sessionId, setSessionId] = useState();
  const { sessionUser } = useSessionUser();

  const setToNotMatchingState = () => {
    // Set the state of the page to not looking for match.
    disconnectSocket();
    reset();
    setMatchState(MatchedState.NOT_MATCHING);
  };

  const setToMatchingState = () => {
    // Set the state of the page to looking for match.
    clearError();
    setDisableBtnCancel(true);
    matchingSocket.connect();
    matchingSocket.on("connected", () => {
      console.log("connected with backend");
    });

    matchingSocket.on("matched", setToMatchedState);
    matchingSocket.on("other-connection", () => {
      setToNotMatchingState();
      setError({
        type: 1,
        message: "This account has attempted to match from another location.",
      });
      disconnectSocket();
    });

    console.log("set matching", matchingSocket);
    matchingSocket.emit("matching", {
      nameSpace: difficulty + "/" + language,
      user: sessionUser,
    });
    matchingSocket.on("matching", () => {
      console.log("emitted");
      setMatchState(MatchedState.MATCHING);
      toggleTimer(new Date().getTime() + 30000);
    });

    matchingSocket.on("timeout", () => {
      setToNotMatchingState();
      setError({
        type: 1,
        message: "Timed out, try again.",
      });
      disconnectSocket();
    });
  };

  const setToMatchedState = (data: any) => {
    // Do something like route to the new session.
    disconnectSocket();
    reset();
    console.log(data.sessionId);
    setSessionId(data.sessionId);
    console.log("peer id", data.peerId);
    setMatchState(MatchedState.NOT_MATCHING);
    setError({
      type: 4,
      message: "Matched with a peer!",
    });
    // router.push(`/session/${data.sessionId}`);
    // window.open(`/session/${data.sessionId}`);
  };

  const disconnectSocket = () => {
    console.log("disconnecting");
    matchingSocket.disconnect();
  };

  useEffect(() => {
    if (matchState === MatchedState.MATCHING) {
      setDisableBtnCancel(false);
    } else {
      setDisableBtnCancel(true);
    }
    return () => {
      matchingSocket.on("timeout", () => {
        setToNotMatchingState();
        setError({
          type: 1,
          message: "Timed out, try again.",
        });
        disconnectSocket();
      });
    };
  }, [isRunning]);

  useEffect(() => {
    if (sessionId) {
      console.log("matched");
      window.open(`/session/${sessionId}`);
    }
  }, [sessionId]);

  return (
    <MatchStateContext.Provider
      value={{
        matchState,
        setToMatchedState,
        setToNotMatchingState,
        setToMatchingState,
        disconnectSocket,
        disableBtnCancel,
        difficulty,
        setDifficulty,
        language,
        setLanguage,
        sessionId,
      }}
    >
      {children}
    </MatchStateContext.Provider>
  );
};

export default MatchStateProvider;
