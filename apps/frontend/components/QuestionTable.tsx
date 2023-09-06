import React from "react";
import styles from "../styles/table.module.css";
import { Question } from "./Question";
import { mockQuestions } from "./MockQuestions";
import AddQuestionModal from "./AddQuestionModal";
import ViewQuestionModal from "./ViewQuestionModal";

type QuestionTableProps = {};

const QuestionTable: React.FC<QuestionTableProps> = () => {
  const [questions, setQuestions] = React.useState<Question[]>(mockQuestions);
  const [viewQuestion, setViewQuestion] = React.useState<Question>({
    id: -1,
    title: "",
    description: "",
    categories: [],
    complexity: "",
    onDelete: () => {},
  });
  const viewButton = React.useRef<HTMLButtonElement>(null);
  const handleSaveQuestion = (newQuestion: Question) => {
    const newId = Math.max(...questions.map((question) => question.id), -1) + 1;
    const questionToAdd = { ...newQuestion, id: newId };

    setQuestions([...questions, questionToAdd]);
  };

  const handleDeleteQuestion = (id: number) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  }

  const handleViewQuestion = (question: Question) => {
    setViewQuestion(question);
    viewButton.current?.click();
  }

  return (
    <>
      <div className={styles["custom-margin"]}>
        <table className="table table-dark table-hover table-striped-columns table-bordered mx-auto text-center align-middle border-warning-subtle">
          <thead className="">
            <tr>
              <th scope="col" className="py-3 col-1">
                Id
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
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id}>
                <th scope="row" className="py-2">{question.id}</th>
                <td className="py-2" onClick={() =>handleViewQuestion(question)}>{question.title}</td>
                <td className="py-2">{question.categories.join(", ")}</td>
                <td className="py-2">{question.complexity}</td>
                <td className="py-2"><button className="btn btn-danger" onClick={() => handleDeleteQuestion(question.id)}>Delete</button></td>
                {/* <td><ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[[remarkGfm,]]}>{question.description}</ReactMarkdown></td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddQuestionModal
        onSave={handleSaveQuestion}
      />
      <div className="text-center">
        <button
          ref = {viewButton}
          hidden
          data-bs-toggle="modal"
          data-bs-target="#viewQuestionModal"
        >
          View Question
        </button>
      </div>
      <ViewQuestionModal 
        onViewQuestion={viewQuestion}
         />
    </>
  );
};
export default QuestionTable;
