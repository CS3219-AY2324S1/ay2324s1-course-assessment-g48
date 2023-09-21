import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import QuestionTable from "@/components/questions/QuestionTable";
import useQuestion from "@/hook/useQuestion";
import LoadingModal from "@/components/LoadingModal";
import useSessionUser from "@/hook/useSessionUser";
import { Role } from "@/utils/enums/Role";

export default function QuestionsRepo() {
  const [openAdd, setOpenAdd] = useState(false);
  const { isLoading } = useQuestion();
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser.role ?? Role.Normal);

  useEffect(() => {
    setUserRole(sessionUser.role ?? Role.Normal);
  }, [sessionUser]);

  return (
    <div className="container-xxl dark:bg-gray-900 overflow-auto">
      <div className=" grid place-content-center">
        <LoadingModal isLoading={isLoading} />
        <div className="flex flex-col space-y-3">
          <div className="lg:flex lg:items-center lg:justify-between">
            <h1 className="text-4xl dark:text-white my-4" hidden={isLoading}>
              It&apos;s grinding time!
            </h1>
            {userRole === Role.Admin && (
              <span className="sm:ml-3" hidden={isLoading}>
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
            hidden={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
