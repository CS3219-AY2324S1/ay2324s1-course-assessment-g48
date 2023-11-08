// MatchStateContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
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

type MatchStateContextType = {
  matchState: MatchedState;
  setToMatchedState: (data: any) => void;
  setToNotMatchingState: () => void;
  setToMatchingState: () => void;
  disconnectSocket: () => void;
  peer: User | null;
  disableBtnCancel?: boolean;
  difficulty: Complexity;
  setDifficulty: React.Dispatch<React.SetStateAction<Complexity>>;
  seconds: number;
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
  const { toggleTimer, seconds, reset, isRunning } = useTimer();
  const [matchState, setMatchState] = useState<MatchedState>(() => {
    return isRunning ? MatchedState.MATCHING : MatchedState.NOT_MATCHING;
  });
  const [peer, setPeer] = useState<User | null>(null);
  const { setError, clearError } = useError();
  const [disableBtnCancel, setDisableBtnCancel] = useState(true);
  const [difficulty, setDifficulty] = useState<Complexity>(Complexity.Easy);
  const { sessionUser } = useSessionUser();
  const router = useRouter();

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
    matchingSocket.emit("matching", { difficulty, user: sessionUser });
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
    console.log(data.peerId);
    getUserById(data.peerId)
      .then((peer) => {
        setPeer(peer);
      })
      .catch((err) => {
        console.log(err);
      });
    setMatchState(MatchedState.MATCHED);
    setError({
      type: 4,
      message: "Matched with a peer!",
    });
    // router.push(`/session/${data.sessionId}`);
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
  }, [isRunning, matchState]);


  return (
    <MatchStateContext.Provider
      value={{
        matchState,
        setToMatchedState,
        setToNotMatchingState,
        setToMatchingState,
        disconnectSocket,
        peer,
        disableBtnCancel,
        difficulty,
        setDifficulty,
        seconds,
      }}
    >
      {children}
    </MatchStateContext.Provider>
  );
};

export default MatchStateProvider;
