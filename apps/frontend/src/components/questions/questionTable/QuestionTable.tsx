import { FC, useEffect, useState } from "react";
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
import { Question } from "@/database/question/entities/question.entity";

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
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser.role ?? Role.Normal);
  const { questions, setQuestions, handleTrigger } = useQuestions(userRole);
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
  const router = useRouter();

  useEffect(() => {
    setUserRole(sessionUser.role ?? Role.Normal);
  }, [sessionUser]);

  const handleSaveQuestion = async (newQuestion: Question) => {
    const questionToAdd = { ...newQuestion };
    await postNewQuestion(questionToAdd, userRole)
      .then(() => {
        handleTrigger();

        setOpenAdd(false);
      })
      .catch((e) => {
        throw new String(e);
      });
  };

  const handleDeleteQuestion = async (id: string) => {
    await deleteQuestionById(id, userRole)
      .then(() => {
        handleTrigger();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEditQuestion = async (editQuestion: Question) => {
    await updateQuestionById(editQuestion._id, editQuestion, userRole)
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
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
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
            {questions.map((question, index) => (
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
      />
    </>
  );
};
export default QuestionTable;
