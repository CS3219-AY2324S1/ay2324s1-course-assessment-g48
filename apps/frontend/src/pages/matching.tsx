import { BASE_URL } from "@/database/user/userService";
import React, { MouseEventHandler, useState } from "react";
import { Socket, io } from "socket.io-client";
type matchingProps = {};

const ws_url = process.env.NEXT_WS_URL;

enum MatchedState {
  NOT_MATCHING = 0,
  MATCHING = 1,
  MATCHED = 2,
}

const MatchingPage: React.FC<matchingProps> = () => {
  const [status, setStatus] = useState<string>("HELLO");
  const [isMatching, setIsMatching] = useState<number>(
    MatchedState.NOT_MATCHING
  );
  const [socket, setSocket] = useState<Socket>();

  const handleMatchConnection: MouseEventHandler = (e) => {
    if (isMatching == MatchedState.NOT_MATCHING) {
      setToNotMatchingState();
    }

    const uid = Math.floor(Math.random() * 100);
    e.preventDefault();

    setSocket(
      io("localhost:8001", { transports: ["websocket"], ackTimeout: 30000 })
    );

    setToMatchingState();
    if (!socket) {
      return;
    }
    socket.emit("matching", { uid, difficulty: "hard" });
    socket.on("matched", setToMatchedState);
  };

  const setToNotMatchingState = () => {
    // Set the state of the page to not looking for match.
    socket?.disconnect();
    setIsMatching(MatchedState.NOT_MATCHING);
  };

  const setToMatchingState = () => {
    // Set the state of the page to looking for match.
    setIsMatching(MatchedState.MATCHING);
  };
  const setToMatchedState = (data: any) => {
    // Do something like route to the new session.
    setIsMatching(MatchedState.MATCHED);
    socket?.disconnect();
  };

  return (
    <div className="grid place-content-center text-white">
      <button className="bg-orange-700" onClick={handleMatchConnection}>
        {isMatching === MatchedState.NOT_MATCHING
          ? "Match"
          : isMatching === MatchedState.MATCHING
          ? "Matching"
          : "Matched"}
      </button>
      <button
        onClick={() => {
          socket?.emit("matching", { data: "hello" });
        }}
      >
        Match
      </button>
      {status}
    </div>
  );
};
export default MatchingPage;
