import React, { Suspense } from "react";
import styles from "../styles/table.module.css";
import { Question } from "../type/Question";
import { mockQuestions } from "./MockQuestions";
import AddQuestionModal from "./AddQuestionModal";
import ViewQuestionModal from "./ViewQuestionModal";
import { postNewQuestion, getAllQuestions, getQuestionById, deleteQuestionById, updateQuestionById } from "../src/utils/database/question/Question";
import useQuestion from "../hook/useQuestion";
import EditQuestionModal from "./EditQuestionModal";

type QuestionTableProps = {};

const QuestionTable: React.FC<QuestionTableProps> = () => {
  const {questions, setQuestions} = useQuestion();
  const [viewQuestion, setViewQuestion] = React.useState<Question>({
    _id: "",
    title: "",
    description: "",
    categories: [],
    complexity: "",
  });
  const [questionToEdit, setQuestionToEdit] = React.useState<Question>({
    _id: "",
    title: "",
    description: "",
    categories: [],
    complexity: "",
  })

  const handleSaveQuestion = (newQuestion: Question) => {
    const questionToAdd = { ...newQuestion, _id: "" };
    console.log(questionToAdd)

    setQuestions([...questions, questionToAdd]);
    postNewQuestion(questionToAdd);
  };

  const handleEditQuestion = (editQuestion: Question) => {
    setQuestionToEdit(editQuestion)
    // updateQuestionById(id, questions[index]).then(()=> {
    //   questions[index].title = editQuestion.title
    //   questions[index].description = editQuestion.description
    //   questions[index].categories = editQuestion.categories
    //   questions[index].complexity = editQuestion.complexity
    // }
    // )
  }

  const handleDeleteQuestion = (id: string) => {
    console.log(id);
    deleteQuestionById(id).then(()=> {
      const updatedQuestions = questions.filter((question:Question) => question._id == id);
      setQuestions(updatedQuestions);
    }
    )
  }

  const handleViewQuestion = (question: Question) => {
    setViewQuestion(question);
    // viewButton.current?.click();
  }

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
                Edit
              </th>
              <th scope="col" className="py-3 col-1">
                Delete
              </th>
            </tr>
          </thead>
          
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <th scope="row" className="py-2">{index+1}</th>
                <td className="py-2">{question.title}</td>
                <td className="py-2">{question.categories.join(", ")}</td>
                <td className="py-2">{question.complexity}</td>
                <td className="py-2">
                  <button className="btn btn-success" 
                    data-bs-toggle="modal"
                    data-bs-target="#viewQuestionModal"
                    onClick={() => handleViewQuestion(question)
                      }
                      >View</button>
                      </td>
                <td className="py-2"><button className="btn btn-warning" data-bs-toggle="modal"
                    data-bs-target="#editQuestionModal" onClick={() => handleEditQuestion(question)}>Edit</button></td>
                <td className="py-2"><button className="btn btn-danger" onClick={() => handleDeleteQuestion(question._id)}>Delete</button></td>
                {/* <td><ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[[remarkGfm,]]}>{question.description}</ReactMarkdown></td> */}
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>

      <AddQuestionModal
        onSave={handleSaveQuestion}
      />
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
      <EditQuestionModal
         onEditQuestion={questionToEdit}
         />
      <ViewQuestionModal 
        onViewQuestion={viewQuestion}
         />
    </>
  );
};
export default QuestionTable;
