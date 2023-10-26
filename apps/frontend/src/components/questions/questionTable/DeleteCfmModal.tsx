import Modal from "@/components/Modal";
import React from "react";

type DeleteCfmModalProps = {
  setOpen: (open: boolean) => void;
  open: boolean;
  onDelete: (id: string) => Promise<void>;
  onDeleteQuestion: {
    _id: string;
    title: string;
    description: string;
    categories: string[];
    complexity: string;
  };
};

const DeleteCfmModal: React.FC<DeleteCfmModalProps> = ({
  setOpen,
  open,
  onDelete,
  onDeleteQuestion,
}) => {
  return (
    <Modal title="Confirm Delete" setOpen={setOpen} open={open}>
      <div className="mt-10 space-y-10">
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this question?
        </p>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => onDelete(onDeleteQuestion._id)}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default DeleteCfmModal;
