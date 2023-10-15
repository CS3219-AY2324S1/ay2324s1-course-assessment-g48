import { FC, useEffect, useState } from "react";
import ViewQuestionModal from "./ViewQuestionModal";
import {
  deleteQuestionById,
  postNewQuestion,
  updateQuestionById,
} from "@/database/question/questionService";
import useQuestion from "@/hook/useQuestions";
import AddQuestionModal from "./AddQuestionModal";
import EditQuestionModal from "./EditQuestionModal";
import { Complexity } from "@/utils/enums/Complexity";
import useSessionUser from "@/hook/useSessionUser";
import { Role } from "@/utils/enums/Role";
import { useRouter } from "next/router";
import { Question } from "@/database/question/entities/question.entity";
import QuestionPagination from "./QuestionPagination";

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
  const { questions, totalQuestions, handleTrigger } = useQuestion();
  const [questionsPerPage, setQuestionsPerPage] = useState(10);
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser.role ?? Role.Normal);
  const [viewQuestion, setViewQuestion] = useState<Question>({
    _id: "",
    title: "",
    description: "",
    categories: [],
    complexity: "",
  });
  const [questionToEdit, setQuestionToEdit] = useState<Question>({
    _id: "",
    title: "",
    description: "",
    categories: [],
    complexity: "",
  });

  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const numberOfPages = Math.ceil(totalQuestions / questionsPerPage);
  const indexOfLastRecord = currentPage * questionsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  useEffect(() => {
    setUserRole(sessionUser.role ?? Role.Normal);
  }, [sessionUser]);

  const handleSaveQuestion = async (newQuestion: Question) => {
    const questionToAdd = { ...newQuestion };
    await postNewQuestion(questionToAdd)
      .then(() => {
        handleTrigger();

        setOpenAdd(false);
      })
      .catch((e) => {
        throw new String(e);
      });
  };

  const handleDeleteQuestion = async (id: string) => {
    await deleteQuestionById(id)
      .then(() => {
        handleTrigger();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEditQuestion = async (editQuestion: Question) => {
    await updateQuestionById(editQuestion._id, editQuestion)
      .then(() => {
        handleTrigger();
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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          className="relative text-sm text-left text-gray-500 dark:text-gray-400"
          hidden={hidden}
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S/N
              </th>
              <th scope="col" className="px-6 py-3">
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
                        onClick={() => handleDeleteQuestion(question._id)}
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
        <QuestionPagination
          hidden={hidden}
          totalQuestionsNum={totalQuestions}
          questionsPerPage={questionsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
        />
      </div>

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
    </>
  );
};
export default QuestionTable;
