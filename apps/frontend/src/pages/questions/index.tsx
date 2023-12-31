import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import useQuestions from "@/hook/useQuestions";
import LoadingModal from "@/components/LoadingModal";
import useSessionUser from "@/hook/useSessionUser";
import { Role } from "@/utils/enums/Role";
import QuestionTable from "@/components/questions/questionTable/QuestionTable";

export default function QuestionsRepo() {
  const [openAdd, setOpenAdd] = useState(false);
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser.role);
  const [accessToken, setAccessToken] = useState(sessionUser.accessToken);
  const [refreshToken, setRefreshToken] = useState(sessionUser.refreshToken);
  const {
    isLoadingQuestion,
    questions,
    totalQuestions,
    handleTrigger,
  } = useQuestions();

  useEffect(() => {
    setUserRole(sessionUser.role);
    setAccessToken(sessionUser.accessToken);
    setRefreshToken(sessionUser.refreshToken);
  }, [sessionUser]);

  return (
    isLoadingQuestion ? <LoadingModal isLoading={isLoadingQuestion} /> :
    <div className="grid place-content-center dark:bg-gray-900">

      <div className="pl-4 pr-4 rounded-lg w-screen xl:px-60 lg:px-40">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl dark:text-white my-4" hidden={isLoadingQuestion}>
            It&apos;s grinding time!
          </h1>
          {userRole === Role.Admin && (
            <span className="sm:ml-3 space-x-2" hidden={isLoadingQuestion}>
              {/* <button
                type="button"
                className="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ArrowPathIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5"
                  aria-hidden="true"
                />
                Update
              </button> */}
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => setOpenAdd(true)}
              >
                <PlusIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5"
                  aria-hidden="true"
                />
                Add Question
              </button>
            </span>
          )}
        </div>

        <QuestionTable
          setOpenAdd={setOpenAdd}
          openAdd={openAdd}
          hidden={isLoadingQuestion}
          userRole={userRole}
          accessToken={accessToken}
          refreshToken={refreshToken}
          questions={questions}
          totalQuestions={totalQuestions}
          handleTrigger={handleTrigger}
        />
      </div>
    </div>
  );
}
