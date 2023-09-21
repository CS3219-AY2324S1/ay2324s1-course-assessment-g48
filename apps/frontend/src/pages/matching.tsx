import { BASE_URL } from "@/database/user/userService";
import { matchingSocket } from "@/utils/socket/socket";
import { useSession } from "next-auth/react";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { io } from "socket.io-client";
type matchingProps = {};

const ws_url = process.env.NEXT_WS_URL;

enum MatchedState {
  NOT_MATCHING = 0,
  MATCHING = 1,
  MATCHED = 2,
}

enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

const MatchingPage: React.FC<matchingProps> = () => {
  const [isMatching, setIsMatching] = useState<number>(
    MatchedState.NOT_MATCHING
  );
  const [difficulty, setDifficulty] = useState<string>("");

  const { data } = useSession();
  const uid = data?.user?.id;

  const [err, setErr] = useState<string>("");

  const handleMatchConnection: MouseEventHandler = (e) => {
    if (difficulty == "") {
      setErr("Select a difficulty!");
      return;
    }

    if (isMatching == MatchedState.MATCHING) {
      setToNotMatchingState();
      return;
    }

    e.preventDefault();

    setToMatchingState();
  };

  const setToNotMatchingState = () => {
    // Set the state of the page to not looking for match.
    disconnectSocket();
    setIsMatching(MatchedState.NOT_MATCHING);
  };

  const setToMatchingState = () => {
    // Set the state of the page to looking for match.
    setErr("");
    matchingSocket.connect();
    matchingSocket.on("matched", setToMatchedState);
    matchingSocket.on("other-connection", () => {
      setToNotMatchingState();
      setErr("This account has attempted to match from another location.");
      disconnectSocket();
    });

    matchingSocket.emit("matching", { difficulty, uid });
    matchingSocket.on("timeout", () => {
      setToNotMatchingState();
      setErr("Timed out, try again.");
      disconnectSocket();
    });
    setIsMatching(MatchedState.MATCHING);
  };

  const setToMatchedState = (data: any) => {
    // Do something like route to the new session.
    disconnectSocket();
    setIsMatching(MatchedState.MATCHED);
  };

  const disconnectSocket = () => {
    console.log("disconnecting");
    matchingSocket.disconnect();
  };

  useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div className="grid place-content-center text-white">
      {/* <input onChange={(e) => setDifficulty(e.target.value)}></input> */}
      <div className="mt-6 space-y-6">
        {Object.values(Difficulty).map((complexityOption) => (
          <div className="flex items-center gap-x-3" key={complexityOption}>
            <input
              id={`complexity${complexityOption}`}
              name="complexity"
              value={complexityOption}
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              onChange={() => {
                setDifficulty(complexityOption);
                setErr("");
              }}
            />
            <label
              htmlFor={`complexity${complexityOption}`}
              className="block text-sm font-medium leading-6 text-white"
            >
              {complexityOption}
            </label>
          </div>
        ))}
      </div>
      <button className="bg-orange-700" onClick={handleMatchConnection}>
        {isMatching === MatchedState.NOT_MATCHING
          ? "Match"
          : isMatching === MatchedState.MATCHING
          ? "Matching"
          : "Matched"}
      </button>
      {/* <button
        onClick={() => {
          socket?.emit("matching", { difficulty: "hard" });
        }}
      >
        Match
      </button> */}
      <button onClick={setToNotMatchingState}>Cancel</button>
      {err != "" ? <div>{err}</div> : <></>}
    </div>
  );
};
export default MatchingPage;
