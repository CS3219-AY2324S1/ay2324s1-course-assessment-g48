import React from "react";
import Modal from "./Modal";

type AuthErrorModalProps = {
  title: string;
  setOpen: (open: boolean) => void;
  open: boolean;
};

const AuthErrorModal: React.FC<AuthErrorModalProps> = ({
  title,
  setOpen,
  open,
}) => {
  return (
    <Modal title={title} setOpen={setOpen} open={open}>
      <div className="space-y-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="errorMessage"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Please sign in first to access PeerPrep features!
            </label>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={() => {
            setOpen(false);
          }}
        >
          OK
        </button>
      </div>
    </Modal>
  );
};
export default AuthErrorModal;
