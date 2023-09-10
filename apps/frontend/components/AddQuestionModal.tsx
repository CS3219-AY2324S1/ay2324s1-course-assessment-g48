import React from "react";
import { Question } from "../type/Question";
import { Complexity } from "./enums/Complexity";
import { Categories } from "./enums/Categories";
import useInput from "../hook/useInput";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useQuestion from "../hook/useQuestion";

type AddQuestionModalProps = {
  onSave: (newQuestion: Question) => void;
};

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  onSave,
}) => {
  const [newQuestion, setNewQuestion] = React.useState<Question>({
    _id: "",
    title: "",
    description: "",
    categories: [],
    complexity: ""
  });
  const {questions} = useQuestion();
  const {value, valueIsValid, hasError, valueChangeHandler, inputBlurHandler, reset} = useInput((s:string) => s.trim().length > 0 && questions.filter((question:Question) => question.title == s).length != 1);
  const handleAddQuestion = () => {
    onSave(newQuestion);
    setNewQuestion({
      _id: "",
      title: "",
      description: "",
      categories: [],
      complexity: ""
    });
    reset();
  };
  return (
    <>
      <div className="text-center">
        <button
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#addQuestionModal"
        >
          Add Question
        </button>
      </div>

      <div
        className="modal fade"
        id="addQuestionModal"
        tabIndex={-1}
        aria-labelledby="addQuestionLabel"
        aria-hidden="true"
        data-bs-theme="dark"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-white" id="addQuestionLabel">
                Add New Question
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={reset}
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label text-white">
                    Title:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${hasError ? "invalid" : ""}`}
                    id="title"
                    onKeyDown={(event:React.KeyboardEvent<HTMLInputElement>) => {
                      if (event.keyCode === 13) {
                      event.preventDefault(); // Prevent form submission on Enter key press
                    }}}
                    value={value}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => 
                      {valueChangeHandler(event) 
                      setNewQuestion({
                        ...newQuestion,
                        title: event.target.value,
                      })
                      }}
                    onBlur={inputBlurHandler}
                  />
                {hasError && value.trim().length <= 0 ? <label className="error-message" style={{ color: 'red' }}>Input cannot be empty.</label> 
                : hasError && questions.filter((question:Question) => question.title == value).length == 1 
                ? <label className="error-message" style={{ color: 'red' }}>Question already exists.</label>
                : null}
                </div>
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
                    value={newQuestion.description}
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
                        checked={newQuestion.complexity === complexityOption}
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
                    value={newQuestion.categories}
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
                disabled={!valueIsValid}
                className="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={handleAddQuestion}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={reset}
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
export default AddQuestionModal;
