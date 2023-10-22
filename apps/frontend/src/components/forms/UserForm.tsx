import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { UserManagement } from "../../utils/enums/UserManagement";
import FormInput from "./FormInput";
import { UpdateUserDto, User } from "@/database/user/entities/user.entity";
import {
  createNewUser,
  deleteUserById,
  updateUserById,
} from "@/database/user/userService";
import useSessionUser from "@/hook/useSessionUser";
import OAuthButton from "./OAuthButton";
import { Role } from "@/utils/enums/Role";
import Image from "next/image";
import Alert from "../Alert";
import { OAuthType } from "@/utils/enums/OAuthType";
import AuthInfoModal from "../AuthInfoModal";
import { AuthInfo } from "@/utils/enums/AuthInfo";
import { useError } from "@/hook/ErrorContext";

interface UserFormProps {
  formType: string;
}

const UserForm: React.FC<UserFormProps> = ({ formType }) => {
  const { status, update } = useSession();
  const { sessionUser } = useSessionUser();
<<<<<<< HEAD
  const { error, setError, clearError } = useError();
  const [newId, setNewId] = useState(sessionUser.id ?? -1);
  const [newUsername, setUsername] = useState(sessionUser.username ?? "");
  const [newEmail, setEmail] = useState(sessionUser.email ?? "");
  const [newPassword, setPassword] = useState(sessionUser.password ?? "");
=======
  const [newId, setNewId] = useState(sessionUser?.id ?? -1);
  const [newUsername, setUsername] = useState(sessionUser?.username ?? "");
  const [newEmail, setEmail] = useState(sessionUser?.email ?? "");
  const [newPassword, setPassword] = useState(sessionUser?.password ?? "");
  const [errorMessage, setErrorMessage] = useState("");
  const [openAlert, setOpenAlert] = useState<boolean>(false);
>>>>>>> dev

  const [openAuthInfo, setOpenAuthInfo] = useState(false);
  const [authProvider, setAuthProvider] = useState(
    undefined as OAuthType | undefined
  );
  const [updateAuthUser, setUpdateAuthUser] = useState(
    undefined as UpdateUserDto | undefined
  );

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  useEffect(() => {
    setNewId(sessionUser?.id ?? -1);
    setUsername(sessionUser?.username ?? "");
    setEmail(sessionUser?.email ?? "");
    setPassword(sessionUser?.password ?? "");
  }, [sessionUser]);

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
    console.log("signing in");
    try {
      console.log("Details", newEmail, newPassword, callbackUrl);
      const result = await signIn("credentials", {
        redirect: false,
        email: newEmail,
        password: newPassword,
        callbackUrl,
      });
      if (result?.error) {
<<<<<<< HEAD
        console.log("Something wrong" , result.error);
        setError("Invalid email or password.");
=======
        console.log("Something wrong", result.error);
        setErrorMessage("Invalid email or password.");
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
>>>>>>> dev
      } else {
        router.push("/questions");
      }
    } catch (err) {
      setError(err as string);
      console.error(err);
<<<<<<< HEAD
=======
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 3000);
>>>>>>> dev
    }
  };

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("signing up", newUsername, newEmail, newPassword, Role.Normal);
    try {
      const newUser: Omit<User, "id"> = {
        username: newUsername,
        email: newEmail,
        password: newPassword,
        oauth: sessionUser?.oauth,
        role: Role.Normal,
      };

      const response = await createNewUser(newUser);
      if (response.error) {
        setError(response.error);
        return;
      }

      console.log("Sign up successful, now trying to sign in");

      const result = await signIn("credentials", {
        redirect: false,
        email: newEmail,
        password: newPassword,
        callbackUrl,
      });

      if (result?.error) {
        console.log(result?.error);
<<<<<<< HEAD
        setError("That email or username has already been taken.");
=======
        setErrorMessage("That email or username has already been taken.");
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
>>>>>>> dev
      } else {
        router.push("/questions");
      }
    } catch (err) {
      console.log(err || "Error undefined???");
<<<<<<< HEAD
      setError(err as string);
=======
      setErrorMessage(err as string);
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 3000);
>>>>>>> dev
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
        oauth: sessionUser?.oauth,
        role: sessionUser?.role,
      };

      const response = await updateUserById(newId, newUser);
      if (response.error) {
        setError(response.error);
        return;
      }

      if (sessionUser) {
        sessionUser.email = newEmail;
        sessionUser.username = newUsername;
        sessionUser.password = newPassword;
      }

      update({ user: sessionUser });
      router.push("/profile");
    } catch (err) {
      setError(err as string);
      console.error(err);
<<<<<<< HEAD
=======
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 3000);
>>>>>>> dev
    }
  };

  const handleProfileDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await deleteUserById(Number(newId));
    if (response.error) {
<<<<<<< HEAD
      setError(response.error);
      return;
    }
    signOut();
  };

  const handleUnlinkOAuth = async (e: { preventDefault: () => void}, provider: OAuthType) => {
    e.preventDefault();
    const newOAuth = sessionUser.oauth?.filter((oauth) => oauth !== provider);
    if (newOAuth == undefined || newOAuth.length == 0) {
      if (newPassword == undefined || newPassword.trim().length == 0) {
        setError("You must enter your password to unlink your last linked account.");
=======
      setErrorMessage(response.error);
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 3000);
      return;
    }
    signOut({callbackUrl: "/"});
  };

  const handleUnlinkOAuth = async (
    e: { preventDefault: () => void },
    provider: OAuthType
  ) => {
    e.preventDefault();
    const newOAuth = sessionUser?.oauth?.filter((oauth) => oauth !== provider);
    if (newOAuth == undefined || newOAuth.length == 0) {
      if (newPassword == undefined || newPassword.trim().length == 0) {
        setErrorMessage(
          "You must enter a password in order to unlink your last linked account."
        );
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
>>>>>>> dev
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
              value={newUsername}
              onChange={setUsername}
            />
          </div>
        )}
        {/* TODO: add tooltip when email is disabled due to Oauth for signup*/}
        <div>
          <FormInput
            type="email"
            label="Email address"
            value={newEmail}
            autoComplete="email"
            disabled={
              status === "authenticated" &&
              sessionUser?.oauth !== undefined &&
              sessionUser.oauth.length !== 0
            }
            onChange={setEmail}
          />
        </div>
        <div>
          <FormInput
            type="password"
            label="Password"
            value={newPassword}
            autoComplete="current-password"
            onChange={setPassword}
          />
        </div>
        {formType === UserManagement.Profile &&
          sessionUser?.oauth !== undefined &&
          sessionUser.oauth.length !== 0 && (
            <div className="flex flex-col items-center space-y-4">
              <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Linked accounts:
              </p>
              <div className="flex w-1/2 justify-center dark:bg-white bg-gray-200 rounded py-2 space-x-3">
                {sessionUser?.oauth?.map((oauth) => (
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
        setErrorMessage={setError}
        newUser={updateAuthUser}
<<<<<<< HEAD
        />
=======
      />
      <Alert message={errorMessage} hidden={openAlert} setHide={setOpenAlert} />
>>>>>>> dev
    </>
  );
};

export default UserForm;
