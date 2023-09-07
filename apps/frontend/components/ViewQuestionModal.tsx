import React from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type ViewQuestionModalProps = {
    onViewQuestion: {id: number, title: string, description: string, categories: string[], complexity: string}
};

const ViewQuestionModal:React.FC<ViewQuestionModalProps> = ({
    onViewQuestion,
}
) => {
    return(
        <>
      <div
        className="modal fade"
        id="viewQuestionModal"
        tabIndex={-1}
        aria-labelledby="addQuestionLabel"
        aria-hidden="true"
        data-bs-theme="dark"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-white" id="viewQuestionLabel">
              {onViewQuestion.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="description"
                    className="form-label text-white"
                  >
                    Description:
                  </label>
                  {/* change to markdown later*/}
                  <ReactMarkdown className="form-label text-white markdown-content"
                   remarkPlugins={[remarkGfm]}>
                    {onViewQuestion.description}
                  </ReactMarkdown>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Complexity: {onViewQuestion.complexity}</label>
                  <br />
                </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    )
}
export default ViewQuestionModal;