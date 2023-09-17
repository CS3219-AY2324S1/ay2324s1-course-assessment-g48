import { FC, useState } from "react";
import styles from "../../../styles/table.module.css";
import ViewQuestionModal from "./ViewQuestionModal";
import {
  deleteQuestionById,
  postNewQuestion,
  updateQuestionById,
} from "@/database/question/questionService";
import { Question } from "../../database/question/entities/question.entity";
import useQuestion from "@/hook/useQuestion";
import AddQuestionModal from "./AddQuestionModal";
import EditQuestionModal from "./EditQuestionModal";

type QuestionTableProps = {};

const QuestionTable: FC<QuestionTableProps> = () => {
  const { questions, setQuestions, isLoading, handleTrigger } = useQuestion();
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

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);

  const handleSaveQuestion = async (newQuestion: Question) => {
    const questionToAdd = { ...newQuestion };
    await postNewQuestion(questionToAdd)
      .then((response) => {
        questionToAdd._id = response._id;
        setQuestions((questions) => [...questions, questionToAdd]);
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
        throw new String(e);
      });
  };

  const handleViewQuestion = (question: Question) => {
    setViewQuestion(question);
    setOpenView(true);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {isLoading ? (
          <div className="center">
            <span className="loader center"></span>
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S/N
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Categories
                </th>
                <th scope="col" className="px-6 py-3">
                  Complexity
                </th>
                <th scope="col" className="px-6 py-3">
                  View
                </th>
                <th scope="col" className="px-6 py-3 center">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3 center">
                  Delete
                </th>
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
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    onClick={() => handleViewQuestion(question)}
                  >
                    {question.title}
                  </td>
                  <td className="px-6 py-4">
                    {question.categories.join(", ")}
                  </td>
                  <td className="px-6 py-4">{question.complexity}</td>
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
                  <td className="px-6 py-4">
                    <button
                      className="  bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => {
                        setQuestionToEdit(question);
                        setOpenEdit(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="  bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => handleDeleteQuestion(question._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
      <ViewQuestionModal onViewQuestion={viewQuestion} setOpen={setOpenView} open={openView} />
    </>
  );
};
export default QuestionTable;
