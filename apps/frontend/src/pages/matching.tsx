import { getUserById } from "@/database/user/userService";
import { matchingSocket } from "@/utils/socket/socket";
import React, { FormEventHandler, useEffect, useState } from "react";
import { Language } from "@/utils/enums/Language";
import { Complexity } from "@/utils/enums/Complexity";
import { MatchedState } from "@/utils/enums/MatchingState";
import Countdown from "@/components/Countdown";
import useTimer from "@/hook/useTimer";
import useSessionUser from "@/hook/useSessionUser";
import { User } from "@/database/user/entities/user.entity";
import { useRouter } from "next/router";
import { useError } from "@/hook/ErrorContext";
import { Role } from "@/utils/enums/Role";
import LoadingModal from "@/components/LoadingModal";
type matchingProps = {};

const MatchingPage: React.FC<matchingProps> = () => {
  const { toggleTimer, seconds, reset, isRunning, countDown } = useTimer();
  const [isMatching, setIsMatching] = useState<number>(
    isRunning ? MatchedState.MATCHING : MatchedState.NOT_MATCHING
  );
  const [difficulty, setDifficulty] = useState<string>(Complexity.Easy);
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser.role);
  const { error, setError, clearError } = useError();
  const [peer, setPeer] = useState<User | null>(null);
  const router = useRouter();

  const handleMatchConnection: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(difficulty);
    toggleTimer(new Date().getTime() + 30000);
    if (isMatching == MatchedState.MATCHING) {
      setToNotMatchingState();
      return;
    }
    setToMatchingState();
  };

  const setToNotMatchingState = () => {
    // Set the state of the page to not looking for match.
    reset();
    disconnectSocket();
    setIsMatching(MatchedState.NOT_MATCHING);
  };

  const setToMatchingState = () => {
    // Set the state of the page to looking for match.
    clearError();
    matchingSocket.connect();
    matchingSocket.on("matched", setToMatchedState);
    matchingSocket.on("other-connection", () => {
      setToNotMatchingState();
      setError("This account has attempted to match from another location.");
      disconnectSocket();
    });
    setIsMatching(MatchedState.MATCHING);
    setTimeout(() => {
      matchingSocket.emit("matching", { difficulty, user: sessionUser });
      matchingSocket.on("timeout", () => {
        setToNotMatchingState();
        setError("Timed out, try again.");
        disconnectSocket();
      });
      
    }, 2000);
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
    setIsMatching(MatchedState.MATCHED);
    setError("Matched with a peer!");
    router.push(`/session/${data.sessionId}`);
  };

  const disconnectSocket = () => {
    console.log("disconnecting");
    matchingSocket.disconnect();
  };

  useEffect(() => {
    return () => {
      matchingSocket.on("timeout", () => {
        setToNotMatchingState();
        setError("Timed out, try again.");
        disconnectSocket();
      });
    }
  }, [isRunning]);

  useEffect(() => {
    setUserRole(sessionUser.role);
  }, [sessionUser]);

  if (userRole == Role.Unknown) {
    return <LoadingModal isLoading={true} />;
  }

  if (userRole == undefined) {
    router.push("/401");
    return;
  }

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
                  clearError();
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
            disabled={isMatching !== MatchedState.NOT_MATCHING}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
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
            <Countdown counter={seconds} />
          </div>
        )}
        {isMatching === MatchedState.MATCHED && (
          <>
            <button
              className="block w-full rounded-m px-3.5 py-2.5 text-center text-sm font-semibold text-gray-900 dark:text-white shadow-s"
              onClick={setToNotMatchingState}
            >
              Close Session
            </button>
            <label>{peer?.username}</label>
          </>
        )}
      </form>
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
