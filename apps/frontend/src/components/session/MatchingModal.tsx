import React from "react";
import Modal from "../Modal";
import { useMatchState } from "@/hook/MatchStateContext";
import { MatchedState } from "@/utils/enums/MatchingState";
import { languageOptions } from "@/utils/constants/LanguageOptions";
import { useError } from "@/hook/ErrorContext";
import { Complexity } from "@/utils/enums/Complexity";
import Countdown from "../Countdown";
import { useTimer } from "@/hook/timerContext";
import { motion } from "framer-motion";

type Props = {
  setOpen: (open: boolean) => void;
  open: boolean;
  handleMatchConnection: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function MatchingModal({
  setOpen,
  open,
  handleMatchConnection,
}: Props) {
  const {
    matchState,
    setToNotMatchingState,
    setToMatchingState,
    disableBtnCancel,
    difficulty,
    setDifficulty,
    language,
    setLanguage,
  } = useMatchState();
  const { clearError } = useError();
  const { seconds } = useTimer();

  return (
    <Modal
      title={`${matchState === MatchedState.MATCHING ? "" : "Match Option"}`}
      setOpen={setOpen}
      open={open}
    >
      {matchState === MatchedState.MATCHING ? (
        <div className="flex flex-col items-center justify-center space-y-5">
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-5">
              <p className="text-3xl font-bold">Matching</p>
              <p className="text-2xl">Finding a match...</p>
              <motion.div
                className="w-1/2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Countdown counter={seconds} />
              </motion.div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <button
              className="px-4 py-2 mt-4 text-white bg-red-600 rounded-md"
              onClick={setToNotMatchingState}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <form className="space-y-8 " onSubmit={handleMatchConnection}>
          <div className="sm:col-span-2 space-y-5 mt-8">
            <label
              htmlFor="language"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Language
            </label>
            <div className="relative mt-2.5">
              <select
                disabled={matchState !== MatchedState.NOT_MATCHING}
                id="language"
                name="language"
                className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6   disabled:bg-gray-300 disabled:cursor-not-allowed"
                onChange={(e) => {
                  console.log(language);
                  setLanguage(e.target.value);
                }}
              >
                {languageOptions
                  .filter((language) =>
                    [63, 54, 62, 71, 74].includes(language.id)
                  )
                  .map((languageOption, index) => (
                    <option key={index}>{languageOption.label}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className="sm:col-span-2 space-y-5 mt-8">
            <label
              htmlFor="difficulty"
              className="block text-sm font-semibold leading-6 text-gray-900 "
            >
              Difficulty
            </label>
            <div className="relative mt-2.5">
              <select
                id="difficulty"
                name="difficulty"
                disabled={matchState !== MatchedState.NOT_MATCHING}
                className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  disabled:bg-gray-300 disabled:cursor-not-allowed"
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value as Complexity);
                  clearError();
                }}
              >
                {Object.values(Complexity).map((complexityOption) => (
                  <option key={complexityOption}>{complexityOption}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12" />
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start Match
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
