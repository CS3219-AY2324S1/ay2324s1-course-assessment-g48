import { BASE_URL } from "@/database/user/userService";
import { matchingSocket } from "@/utils/socket/socket";
import { useSession } from "next-auth/react";
import React, { FormEventHandler, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Language } from "@/utils/enums/Language";
import { Complexity } from "@/utils/enums/Complexity";
import { MatchedState } from "@/utils/enums/MatchingState";
import Countdown from "@/components/Countdown";
import useTimer from "@/hook/useTimer";
type matchingProps = {};

const ws_url = process.env.NEXT_WS_URL;

const MatchingPage: React.FC<matchingProps> = () => {
  const {toggleTimer, isRunning, reset} = useTimer()
  const [isMatching, setIsMatching] = useState<number>(
    MatchedState.NOT_MATCHING
  );
  const [difficulty, setDifficulty] = useState<string>(Complexity.Easy);

  const { data } = useSession();
  const uid = data?.user?.id;
  const [err, setErr] = useState<string>("");

  const handleMatchConnection: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(difficulty);
    if (isMatching == MatchedState.MATCHING) {
      setToNotMatchingState();
      return;
    }
    setToMatchingState();
  };

  const setToNotMatchingState = () => {
    // Set the state of the page to not looking for match.
    disconnectSocket();
    reset()
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
    <>
    <form
      className="mx-auto mt-16 max-w-xl sm:mt-20"
      onSubmit={handleMatchConnection}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="language"
            className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Language
          </label>
          <div className="relative mt-2.5">
            <select
              id="language"
              name="language"
              className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {Object.values(Language).map((languageOption) => (
                <option key={languageOption}>{languageOption}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="difficulty"
            className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Difficulty
          </label>
          <div className="relative mt-2.5">
            <select
              id="difficulty"
              name="difficulty"
              className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={difficulty}
              onChange={(e) => {
                setDifficulty(e.target.value);
                setErr("");
              }}
            >
              {Object.values(Complexity).map((complexityOption) => (
                <option key={complexityOption}>{complexityOption}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={toggleTimer}
        >
          {isMatching === MatchedState.NOT_MATCHING
            ? "Match"
            : isMatching === MatchedState.MATCHING
            ? "Matching"
            : "Matched"}
        </button>
      </div>
      {isMatching === MatchedState.MATCHING && (
        <div className="mt-3">
          <button
            className="block w-full rounded-m px-3.5 py-2.5 text-center text-sm font-semibold text-gray-900 dark:text-white shadow-s"
            onClick={setToNotMatchingState}
          >
            Cancel
          </button>
        </div>
      )}
    </form>
    <Countdown />
  </>
  );

  // return (
  //   <div className="grid place-content-center text-white">
  //     {/* <input onChange={(e) => setDifficulty(e.target.value)}></input> */}
  //     <div className="mt-6 space-y-6">
  //       {Object.values(Difficulty).map((complexityOption) => (
  //         <div className="flex items-center gap-x-3" key={complexityOption}>
  //           <input
  //             id={`complexity${complexityOption}`}
  //             name="complexity"
  //             value={complexityOption}
  //             type="radio"
  //             className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
  //             onChange={() => {
  //               setDifficulty(complexityOption);
  //               setErr("");
  //             }}
  //             disabled={isMatching !== MatchedState.NOT_MATCHING}
  //           />
  //           <label
  //             htmlFor={`complexity${complexityOption}`}
  //             className="block text-sm font-medium leading-6 text-white"
  //           >
  //             {complexityOption}
  //           </label>
  //         </div>
  //       ))}
  //     </div>
  //     <button className="bg-orange-700" onClick={handleMatchConnection}>
  //       {isMatching === MatchedState.NOT_MATCHING
  //         ? "Match"
  //         : isMatching === MatchedState.MATCHING
  //         ? "Matching"
  //         : "Matched"}
  //     </button>
  //     {/* <button
  //       onClick={() => {
  //         socket?.emit("matching", { difficulty: "hard" });
  //       }}
  //     >
  //       Match
  //     </button> */}
  //     <button onClick={setToNotMatchingState}>Cancel</button>
  //     {err != "" ? <div>{err}</div> : <></>}
  //   </div>
  // );
};
export default MatchingPage;
