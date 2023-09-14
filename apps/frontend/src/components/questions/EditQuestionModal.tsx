import useQuestion from "@/hook/useQuestion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Question } from "../../../type/Question";
import { Complexity } from "@/utils/enums/Complexity";
import { Category } from "@/utils/enums/Category";
import { useEffect, useRef, useState } from "react";

type EditQuestionModalProps = {
    onEditQuestion: {_id: string, title: string, description: string, categories: string[], complexity: string}
    onUpdate: (newQuestion: Question) => Promise<void>
};

const EditQuestionModal: React.FC<EditQuestionModalProps>  = ({
  onEditQuestion, onUpdate
}) => {
  const [newQuestion, setNewQuestion] = useState<Question>(onEditQuestion);
  const [error, setError] = useState<string>("");
  const closeModalRef = useRef<HTMLButtonElement | null>(null);
  const closeModal = () => {
    if (closeModalRef.current) {
      closeModalRef.current.click();
    }
  };
  const handleEditQuestion = async () => {
    await onUpdate(newQuestion)
    .then(() => {
      setError("")
      closeModal()
    })
    .catch(e => {
      setError(e)
    })
  };

  useEffect(() => {
    setNewQuestion(onEditQuestion)
  }, [onEditQuestion])
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
                ref={closeModalRef}
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
                    value = {newQuestion.description}
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
                        checked = {newQuestion.complexity == complexityOption}
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
                    {Object.values(Category).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
              {error ? (
                <label className="error-message" style={{ color: "red" }}>
                  {error}
                </label>
              ) : (
                <></>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
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