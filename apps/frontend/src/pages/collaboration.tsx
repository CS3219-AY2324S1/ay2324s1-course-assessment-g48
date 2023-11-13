import React, { FormEventHandler, useEffect, useState } from "react";
import { Complexity } from "@/utils/enums/Complexity";
import { MatchedState } from "@/utils/enums/MatchingState";
import useSessionUser from "@/hook/useSessionUser";
import { useRouter } from "next/router";
import { useError } from "@/hook/ErrorContext";
import { Role } from "@/utils/enums/Role";
import LoadingModal from "@/components/LoadingModal";
import { languageOptions } from "@/utils/constants/LanguageOptions";
import { useMatchState } from "@/hook/MatchStateContext";
import { PlusIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";
import MatchingModal from "@/components/session/MatchingModal";
import SessionTable from "@/components/session/SessionTable";
type collaborationProps = {};

const CollaborationPage: React.FC<collaborationProps> = () => {
  const [openModal, setOpenModal] = useState(false);
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser.role);
  const {  clearError } = useError();
  const router = useRouter();
  const {
    matchState,
    setToNotMatchingState,
    setToMatchingState,
    difficulty,
  } = useMatchState();

const handleMatchConnection: FormEventHandler = (e) => {
  e.preventDefault();
  console.log(difficulty);
  if (matchState == MatchedState.MATCHING) {
    setToNotMatchingState();
    return;
  }
  setToMatchingState();
};

  
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
    <div className="grid place-content-center dark:bg-gray-900">
      <div className="pl-4 pr-4 rounded-lg w-screen xl:px-60 lg:px-40">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl dark:text-white my-4" >
            My Workspace
          </h1>
            <span className="sm:ml-3 space-x-2" >
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => setOpenModal(true)}
              >
                <RocketLaunchIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5"
                  aria-hidden="true"
                />
                Match
              </button>
            </span>
        </div>
        <SessionTable />
      </div>
      <MatchingModal
        setOpen={setOpenModal}
        open={openModal}
        handleMatchConnection={handleMatchConnection}
      />
    </div>
  );
};
export default CollaborationPage;
