import { FC, useState } from "react";
import styles from "../../../styles/table.module.css";
import ViewQuestionModal from "./ViewQuestionModal";
import {
  deleteQuestionById,
  postNewQuestion,
} from "@/database/question/questionService";
import { Question } from "../../database/question/entities/question.entity";
import useQuestion from "@/hook/useQuestion";
import AddQuestionModal from "./AddQuestionModal";

type QuestionTableProps = {};

const QuestionTable: FC<QuestionTableProps> = () => {
  const { questions, setQuestions, isLoading } = useQuestion();
  const [viewQuestion, setViewQuestion] = useState<Question>({
    _id: "",
    title: "",
    description: "",
    categories: [],
    complexity: "",
  });

  const handleSaveQuestion = async (newQuestion: Question) => {
    const questionToAdd = { ...newQuestion };

    const question = await postNewQuestion(questionToAdd);
    questionToAdd._id = question._id;
    setQuestions((questions) => [...questions, questionToAdd]);
  };

  const handleDeleteQuestion = (id: string) => {
    deleteQuestionById(id).then(() => {
      const updatedQuestions = questions.filter(
        (question: Question) => question._id !== id
      );
      setQuestions(updatedQuestions);
    });
  };

  const handleViewQuestion = (question: Question) => {
    setViewQuestion(question);
  };

  return (
    <>
      <div className={styles["custom-margin"]}>
        {isLoading ? (
          <div className="center">
            <span className="loader center"></span>
          </div>
        ) : (
          <table className="table table-dark table-hover table-striped-columns table-bordered mx-auto text-center align-middle border-warning-subtle">
            <thead className="">
              <tr>
                <th scope="col" className="py-3 col-1">
                  S/N
                </th>
                <th scope="col" className="py-3">
                  Title
                </th>
                <th scope="col" className="py-3 col-2">
                  Categories
                </th>
                <th scope="col" className="px-4 py-3 col-1">
                  Complexity
                </th>
                <th scope="col" className="py-3 col-1">
                  View
                </th>
                <th scope="col" className="py-3 col-1">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <th scope="row" className="py-2">
                    {index + 1}
                  </th>
                  <td
                    className="py-2"
                    onClick={() => handleViewQuestion(question)}
                  >
                    {question.title}
                  </td>
                  <td className="py-2">{question.categories.join(", ")}</td>
                  <td className="py-2">{question.complexity}</td>
                  <td className="py-2">
                    <button
                      className="btn btn-success"
                      data-bs-toggle="modal"
                      data-bs-target="#viewQuestionModal"
                      onClick={() => handleViewQuestion(question)}
                    >
                      View
                    </button>
                  </td>
                  <td className="py-2">
                    <button
                      className="btn btn-danger"
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
      <AddQuestionModal onSave={handleSaveQuestion} />

      <ViewQuestionModal onViewQuestion={viewQuestion} />
    </>
  );
};
export default QuestionTable;