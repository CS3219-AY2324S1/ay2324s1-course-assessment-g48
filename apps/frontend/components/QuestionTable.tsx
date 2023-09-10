import React from "react";
import styles from "../styles/table.module.css";
import { Question } from "./Question";
import AddQuestionModal from "./AddQuestionModal";
import ViewQuestionModal from "./ViewQuestionModal";
import { postNewQuestion } from "../src/utils/database/question/Question";
import useQuestion from "../hook/useQuestion";

type QuestionTableProps = {};

const QuestionTable: React.FC<QuestionTableProps> = () => {
  const { questions, setQuestions } = useQuestion();
  const [viewQuestion, setViewQuestion] = React.useState<Question>({
    id: "",
    title: "",
    description: "",
    categories: [],
    complexity: "",
  });

  const handleSaveQuestion = (newQuestion: Question) => {
    const questionToAdd = { ...newQuestion, id: "" };

    setQuestions([...(questions ?? []), questionToAdd]);
    postNewQuestion(questionToAdd);
  };

  const handleDeleteQuestion = (id: string) => {
    const updatedQuestions = questions?.filter(
      (question) => question.id !== id
    );
    setQuestions(updatedQuestions);
  };

  const handleViewQuestion = (question: Question) => {
    setViewQuestion(question);
    // viewButton.current?.click();
  };

  return (
    <>
      <div className={styles["custom-margin"]}>
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
            {questions?.map((question, index) => (
              <tr key={index}>
                <th scope="row" className="py-2">
                  {index + 1}
                </th>
                <td className="py-2">
                  <button
                    className="btn btn-link text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#viewQuestionModal"
                    onClick={() => handleViewQuestion(question)}
                  >
                    {question.title}
                  </button>
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
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddQuestionModal onSave={handleSaveQuestion} />
      {/* <div className="text-center">
        <button
          ref = {viewButton}
          hidden
          data-bs-toggle="modal"
          data-bs-target="#viewQuestionModal"
        >
          View Question
        </button>
      </div> */}
      <ViewQuestionModal onViewQuestion={viewQuestion} />
    </>
  );
};
export default QuestionTable;
