import React from "react";
import { Question } from "../type/Question";
import { Complexity } from "./enums/Complexity";
import { Categories } from "./enums/Categories";
import useInput from "../hook/useInput";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useQuestion from "../hook/useQuestion";

type EditQuestionModalProps = {
    onEditQuestion: {_id: string, title: string, description: string, categories: string[], complexity: string}
};

const EditQuestionModal: React.FC<EditQuestionModalProps>  = ({
  onEditQuestion
}) => {
  const [newQuestion, setNewQuestion] = React.useState<Question>(onEditQuestion);
  const reset = () => {
    setNewQuestion(onEditQuestion)
  }
  const {questions} = useQuestion();
  const handleEditQuestion = () => {
    setNewQuestion({
      _id: "",
      title: "",
      description: "",
      categories: [],
      complexity: ""
    });
  };
  return (
    <>
      <div
        className="modal fade"
        id="editQuestionModal"
        tabIndex={-1}
        aria-labelledby="addQuestionLabel"
        aria-hidden="true"
        data-bs-theme="dark"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-white" id="addQuestionLabel">
                {onEditQuestion.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className="form-label text-white"
                  >
                    Description:
                  </label>
                  {/* change to markdown later*/}
                  <textarea
                    className="form-control"
                    id="description"
                    defaultValue = {onEditQuestion.description}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                  
                </div>
                <div className="mb-3">
                  <label
                      className="form-label text-white"
                    >
                      Preview:
                    </label>
                    <ReactMarkdown className="form-text text-white markdown-content" remarkPlugins={[remarkGfm]}>
                      {newQuestion.description}
                    </ReactMarkdown>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Complexity:</label>
                  <br />
                  {Object.values(Complexity).map((complexityOption) => (
                    <div
                      className="form-check form-check-inline"
                      key={complexityOption}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="complexity"
                        id={`complexity${complexityOption}`}
                        value={complexityOption}
                        defaultChecked = {newQuestion.complexity === complexityOption}
                        onChange={() =>
                          setNewQuestion({
                            ...newQuestion,
                            complexity: complexityOption,
                          })
                        }
                      />
                      <label
                        className="form-check-label text-white"
                        htmlFor={`complexity${complexityOption}`}
                      >
                        {complexityOption}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mb-3">
                  <label htmlFor="categories" className="form-label text-white">
                    Categories: (hold Shift to select multiple)
                  </label>
                  <select
                    className="form-select"
                    multiple
                    id="categories"
                    value={onEditQuestion.categories}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        categories: Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        ),
                      })
                    }
                  >
                    {Object.values(Categories).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={handleEditQuestion}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditQuestionModal;
