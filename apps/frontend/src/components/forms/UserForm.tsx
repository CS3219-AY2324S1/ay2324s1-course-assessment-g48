import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import router from "next/router";
import React, { useState } from "react";
import { UserManagement } from "../../utils/enums/UserManagement";
import FormInput from "./FormInput";
import { UpdateUserDto, User } from "@/database/user/entities/user.entity";
import {
  createNewUser,
  deleteUserById,
  getUserById,
  updateUserById,
} from "@/database/user/userService";
import useSessionUser from "@/hook/useSessionUser";
import OAuthButton from "./OAuthButton";
import { Role } from "@/utils/enums/Role";
import Image from "next/image";
import { OAuthType } from "@/utils/enums/OAuthType";
import AuthInfoModal from "./AuthInfoModal";
import { AuthInfo } from "@/utils/enums/AuthInfo";
import { useError } from "@/hook/ErrorContext";

interface UserFormProps {
  formType: string;
}

const UserForm: React.FC<UserFormProps> = ({ formType }) => {
  const { status, update } = useSession();
  const { sessionUser } = useSessionUser();
  const { setError } = useError();
  const newId = React.useMemo(() => sessionUser.id, [sessionUser.id]);
  const [newUsername, setNewUsername] = useState(sessionUser.username);
  const [newEmail, setNewEmail] = useState(sessionUser.email);
  const [newPassword, setNewPassword] = useState(sessionUser.password);

  const [openAuthInfo, setOpenAuthInfo] = useState(false);
  const [authProvider, setAuthProvider] = useState(
    undefined as OAuthType | undefined
  );
  const [updateAuthUser, setUpdateAuthUser] = useState(
    undefined as UpdateUserDto | undefined
  );

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const hasOAuth =
    status === "authenticated" &&
    sessionUser.oauth !== undefined &&
    sessionUser.oauth.length !== 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formType === UserManagement.SignIn) {
      handleSignIn(e);
    }
    if (formType === UserManagement.SignUp) {
      handleSignUp(e);
    }
    if (formType === UserManagement.Profile) {
      handleProfileUpdate(e);
    }
  };

  const handleSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: newEmail,
        password: newPassword,
        callbackUrl,
      });
      if (result?.error) {
        setError({
          type: 1,
          message: "Invalid email or password.",
        });
      } else {
        setError({
          type: 4,
          message: "Account login successfully!",
        });
        router.push("/questions");
      }
    } catch (err) {
      setError({
        type: 1,
        message: err as string,
      });
      console.error(err);
    }
  };

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const newUser: Omit<User, "id"> = {
        username: newUsername,
        email: newEmail,
        password: newPassword,
        oauth: sessionUser.oauth,
        role: Role.Normal,
      };

      const response = await createNewUser(newUser);
      if (response.error) {
        setError({
          type: 1,
          message: response.error,
        });
        return;
      }


      const result = await signIn("credentials", {
        redirect: false,
        email: newEmail,
        password: newPassword,
        callbackUrl,
      });

      if (result?.error) {
        console.log(result?.error);
        setError({
          type: 1,
          message: "That email or username has already been taken.",
        });
      } else {
        setError({
          type: 4,
          message: "Account login successfully!",
        });
        router.push("/questions");
      }
    } catch (err) {
      setError({
        type: 1,
        message: err as string,
      });
    }
  };

  const handleProfileUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const newUser: UpdateUserDto = {
        id: newId,
        username: newUsername,
        email: newEmail,
        password: newPassword,
        oauth: sessionUser.oauth,
        role: sessionUser.role,
      };

      const response = await updateUserById(newId, newUser);
      if (response.error) {
        setError({
          type: 1,
          message: response.error,
        });
        return;
      } else {
        setError({
          type: 4,
          message: "Profile updated successfully!",
        });
      }

      if (sessionUser) {
        sessionUser.email = newEmail;
        sessionUser.username = newUsername;
        sessionUser.password = newPassword;
      }

      update({ user: sessionUser });
      router.push("/profile");
    } catch (err) {
      setError({
        type: 1,
        message: err as string,
      });
      console.error(err);
    }
  };

  const handleProfileDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await deleteUserById(Number(newId));
    if (response.error) {
      setError({
        type: 1,
        message: response.error,
      });
      return;
    } else {
      setError({
        type: 4,
        message: "Profile deleted successfully!",
      });
    }
    signOut({ callbackUrl: "/" });
  };

  const handleUnlinkOAuth = async (
    e: { preventDefault: () => void },
    provider: OAuthType
  ) => {
    e.preventDefault();
    const newOAuth = sessionUser.oauth?.filter((oauth) => oauth !== provider);
    if (newOAuth == undefined || newOAuth.length == 0) {
      const currUser = await getUserById(sessionUser.id);
      if (
        !currUser.password &&
        (newPassword == undefined || newPassword.trim().length == 0)
      ) {
        setError({
          type: 1,
          message:
            "Please enter a password before unlinking your last 3rd party account.",
        });
        return;
      }
    }

    const newUser: UpdateUserDto = {
      id: newId,
      password: newPassword,
      oauth: newOAuth,
    };

    setOpenAuthInfo(true);
    setAuthProvider(provider);
    setUpdateAuthUser(newUser);
  };

  return (
    <>
      <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
        {formType !== UserManagement.SignIn && (
          <div>
            <FormInput
              type="text"
              label="Username"
              value={newUsername!}
              placeholder="Enter username"
              onChange={setNewUsername}
            />
          </div>
        )}
        <div>
          <FormInput
            type="email"
            label="Email address"
            value={newEmail!}
            placeholder="Enter email"
            autoComplete="email"
            disabled={hasOAuth}
            onChange={setNewEmail}
          />
        </div>
        <div>
          <FormInput
            type="password"
            label="Password"
            value={newPassword!}
            placeholder={
              formType === UserManagement.Profile
                ? "Enter new password"
                : "Enter password"
            }
            autoComplete="current-password"
            onChange={setNewPassword}
          />
        </div>
        {formType === UserManagement.Profile && hasOAuth && (
          <div className="flex flex-col items-center space-y-4">
            <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
              Linked accounts:
            </p>
            <div className="flex w-1/2 justify-center dark:bg-white bg-gray-200 rounded py-2 space-x-3">
              {sessionUser.oauth?.map((oauth) => (
                <Image
                  key={oauth}
                  src={`/${oauth}.svg`}
                  alt={oauth}
                  height={25}
                  width={25}
                  className="cursor-pointer"
                  onClick={(e) => handleUnlinkOAuth(e, oauth)}
                />
              ))}
            </div>
            <p className="block text-xs leading-6 text-gray-900 dark:text-white">
              Click on an icon to unlink account
            </p>
          </div>
        )}
        <div className="flex flex-col text-center justify-center items-center d-flex space-y-6">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {formType == UserManagement.Profile ? "Update" : formType}
          </button>
          {formType == UserManagement.Profile && (
            <button
              onClick={handleProfileDelete}
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete Profile
            </button>
          )}
        </div>
      </form>
      {formType == UserManagement.SignIn && (
        <>
          <OAuthButton provider="google"></OAuthButton>
          <OAuthButton provider="github"></OAuthButton>
        </>
      )}

      <AuthInfoModal
        title={AuthInfo.UnlinkOauth}
        setOpen={setOpenAuthInfo}
        open={openAuthInfo}
        provider={authProvider}
        setError={setError}
        newUser={updateAuthUser}
      />
    </>
  );
};

export default UserForm;
