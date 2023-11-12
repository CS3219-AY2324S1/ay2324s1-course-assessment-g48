import { FC, useEffect, useState, useMemo } from "react";
import ViewQuestionModal from "./ViewQuestionModal";
import {
  deleteQuestionById,
  postNewQuestion,
  updateQuestionById,
} from "@/database/question/questionService";
import useQuestions from "@/hook/useQuestions";
import AddQuestionModal from "./AddQuestionModal";
import EditQuestionModal from "./EditQuestionModal";
import { Complexity } from "@/utils/enums/Complexity";
import useSessionUser from "@/hook/useSessionUser";
import { Role } from "@/utils/enums/Role";
import { useRouter } from "next/router";
import {
  Question,
  initialQuestion,
} from "@/database/question/entities/question.entity";
import QuestionPagination from "./QuestionPagination";
import DeleteCfmModal from "./DeleteCfmModal";
import { Category } from "@/utils/enums/Category";
import QuestionSearchBar from "./QuestionSearchBar";
import { useSession } from "next-auth/react";

type QuestionTableProps = {
  setOpenAdd: (open: boolean) => void;
  openAdd: boolean;
  hidden?: boolean;
};

const QuestionTable: FC<QuestionTableProps> = ({
  setOpenAdd,
  openAdd,
  hidden,
}) => {
  const questionsPerPage = useMemo(() => 10, []);
  const { data: session } = useSession();
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser.role);
  const [accessToken, setAccessToken] = useState(sessionUser.accessToken);
  const [refreshToken, setRefreshToken] = useState(sessionUser.refreshToken);
  const { questions, totalQuestions, handleTrigger } = useQuestions(
    sessionUser.accessToken,
    sessionUser.refreshToken
  );
  const [searchResults, setSearchResults] = useState("");
  const [viewQuestion, setViewQuestion] = useState<Question>(initialQuestion);
  const [questionToEdit, setQuestionToEdit] =
    useState<Question>(initialQuestion);
  const [questionToDelete, setQuestionToDelete] =
    useState<Question>(initialQuestion);

  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDelCfm, setOpenDelCfm] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const router = useRouter();
  const numberOfPages = Math.ceil(totalQuestions / questionsPerPage);
  const indexOfLastRecord = currentPage * questionsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    console.log(event.target.value);
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDifficulty(event.target.value);
  };

  useEffect(() => {
    setUserRole(sessionUser.role);
    setAccessToken(sessionUser.accessToken);
    setRefreshToken(sessionUser.refreshToken);
  }, [sessionUser]);

  useEffect(() => {
    setFilteredQuestions(
      questions.filter(
        (question) =>
          (question.categories.includes(selectedCategory) ||
            selectedCategory === "") &&
          (question.complexity.includes(selectedDifficulty) ||
            selectedDifficulty === "") &&
          question.title.toLowerCase().includes(searchResults.toLowerCase())
      )
    );
  }, [selectedCategory, selectedDifficulty, questions, searchResults]);

  const handleSaveQuestion = async (newQuestion: Question) => {
    const questionToAdd = { ...newQuestion };
    await postNewQuestion(accessToken!, refreshToken!, questionToAdd)
      .then((data) => {
        handleTrigger();
        if (data.accessToken) {
          session!.user!.accessToken = data.accessToken;
          console.log("Refresh accessToken", session);
        }
        setOpenAdd(false);
      })
      .catch((e) => {
        throw String(e);
      });
  };

  const handleDeleteQuestion = async (id: string) => {
    await deleteQuestionById(id, accessToken!, refreshToken!)
      .then((data) => {
        handleTrigger();
        if (data.accessToken) {
          session!.user!.accessToken = data.accessToken;
          console.log("Refresh accessToken", session);
        }
        setOpenDelCfm(false);
      })
      .catch((e) => {
        throw String(e);
      });
  };

  const handleEditQuestion = async (editQuestion: Question) => {
    await updateQuestionById(
      editQuestion._id,
      accessToken!,
      refreshToken!,
      editQuestion
    )
      .then((data) => {
        handleTrigger();
        if (data.accessToken) {
          session!.user!.accessToken = data.accessToken;
          console.log("Refresh accessToken", session);
        }
        setOpenEdit(false);
      })
      .catch((e) => {
        throw String(e);
      });
  };

  const handleViewQuestion = (question: Question) => {
    setViewQuestion(question);
    setOpenView(true);
  };

  function handleQuestionClick(question: Question): void {
    router.push(`/questions/${question._id}`);
  }

  return (
    <>
      <div className="flex items-center mb-4 space-x-4 justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              id="categoryDropdown"
              className="border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm w-36 appearance-none"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option value="">All Categories</option>
              {Object.values(Category).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <select
              id="difficultyDropdown"
              className="border rounded-md px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm w-36 appearance-none"
              onChange={handleDifficultyChange}
              value={selectedDifficulty}
            >
              <option value="">All Difficulties</option>
              {Object.values(Complexity).map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>
        <QuestionSearchBar
          questions={filteredQuestions}
          setSearch={setSearchResults}
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table
          className=" relative text-sm text-left text-gray-500 dark:text-gray-400 w-full"
          hidden={hidden}
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                S/N
              </th>
              <th scope="col" className="px-6 py-3 w-1/5">
                Title
              </th>
              <th scope="col" className="px-6 py-3 w-1/3">
                Categories
              </th>
              <th scope="col" className="px-6 py-3">
                Complexity
              </th>
              <th scope="col" className="px-6 py-3">
                View
              </th>
              {userRole === Role.Admin && (
                <>
                  <th scope="col" className="px-6 py-3 center">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3 center">
                    Delete
                  </th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {currentQuestions.map((question, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th scope="row" className="py-2 center">
                  {index + 1}
                </th>
                <td
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                  onClick={() => handleQuestionClick(question)}
                >
                  {question.title}
                </td>
                <td className="px-6 py-4">{question.categories.join(", ")}</td>
                <td
                  className={`px-6 py-4 ${
                    question.complexity === Complexity.Easy
                      ? "text-green-600"
                      : question.complexity === Complexity.Medium
                      ? " text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {question.complexity}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      handleViewQuestion(question);
                    }}
                  >
                    View
                  </button>
                </td>
                {userRole === Role.Admin && (
                  <>
                    <td className="px-6 py-4 center">
                      <button
                        className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => {
                          setQuestionToEdit(question);
                          setOpenEdit(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4 center">
                      <button
                        className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => {
                          setOpenDelCfm(true);
                          setQuestionToDelete(question);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <QuestionPagination
        hidden={hidden}
        totalQuestionsNum={filteredQuestions.length}
        questionsPerPage={questionsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        indexOfFirstRecord={indexOfFirstRecord}
        indexOfLastRecord={indexOfLastRecord}
      />

      <AddQuestionModal
        onSave={handleSaveQuestion}
        setOpen={setOpenAdd}
        open={openAdd}
      />
      <EditQuestionModal
        onEditQuestion={questionToEdit}
        onUpdate={handleEditQuestion}
        setOpen={setOpenEdit}
        open={openEdit}
      />
      <ViewQuestionModal
        onViewQuestion={viewQuestion}
        setOpen={setOpenView}
        open={openView}
        handleQuestionClick={handleQuestionClick}
      />
      <DeleteCfmModal
        setOpen={setOpenDelCfm}
        open={openDelCfm}
        onDelete={handleDeleteQuestion}
        onDeleteQuestion={questionToDelete}
      />
    </>
  );
};
export default QuestionTable;
