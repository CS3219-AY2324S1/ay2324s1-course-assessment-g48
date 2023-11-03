import React from "react";
import Modal from "./Modal";
import { AuthInfo } from "@/utils/enums/AuthInfo";
import { UpdateUserDto } from "@/database/user/entities/user.entity";
import { updateUserById } from "@/database/user/userService";
import router from "next/router";
import useSessionUser from "@/hook/useSessionUser";
import { useSession } from "next-auth/react";
import { Error } from "@/hook/ErrorContext";

type AuthInfoModalProps = {
  title: AuthInfo;
  setOpen: (open: boolean) => void;
  open: boolean;
  provider?: string;
  newUser?: UpdateUserDto;
  setError?: (error: Error) => void;
};

const AuthInfoModal: React.FC<AuthInfoModalProps> = ({
  title,
  setOpen,
  open,
  provider,
  newUser,
  setError,
}) => {
  const unauthorisedMessage =
    "Please sign in first to access PeerPrep features!";
  const unlinkOAuthMessage = `Are you sure you want to unlink your ${provider?.charAt(0).toUpperCase()}${provider?.slice(1)} account?`;
  const { update } = useSession();
  const { sessionUser } = useSessionUser();

  async function handleConfirmUnlinkOAuth(newUser: UpdateUserDto, setError: (error: Error) => void) {
    const newId = newUser.id;
    const response = await updateUserById(newId, newUser);
    if (response.error) {
      setError({
        type: 1,
        message: response.error
      });
      return;
    }

    if (sessionUser) {
      sessionUser.password = newUser.password;
      sessionUser.oauth = newUser.oauth;
    }

    update({ user: sessionUser });
    router.push("/profile");
  }

  return (
    <Modal title={title} setOpen={setOpen} open={open}>
      <div className="space-y-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="errorMessage"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {title === AuthInfo.Unauthorised
                ? unauthorisedMessage
                : unlinkOAuthMessage}
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
          {title === AuthInfo.Unauthorised ? "Ok" : "No"}
        </button>
        {title === AuthInfo.UnlinkOauth && (
          <button
            type="button"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            onClick={() => {
              setOpen(false);
              handleConfirmUnlinkOAuth(newUser!, setError!);
            }}
          >
            Yes
          </button>
        )}
      </div>
    </Modal>
  );
};
export default AuthInfoModal;
