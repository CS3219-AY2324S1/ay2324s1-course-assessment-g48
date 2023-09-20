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

interface UserFormProps {
  formType: string;
}

const UserForm: React.FC<UserFormProps> = ({ formType }) => {
  const { data: session, status, update } = useSession();
  const { sessionUser } = useSessionUser();
  const [newId, setNewId] = useState(sessionUser.id ?? -1);
  const [newUsername, setUsername] = useState(sessionUser.username);
  const [newEmail, setEmail] = useState(sessionUser.email ?? "");
  const [newPassword, setPassword] = useState(sessionUser.password ?? "");
  const [errorMessage, setErrorMessage] = useState("");
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

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
        console.log(result.error);
        setErrorMessage("Invalid email or password.");
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
      } else {
        router.push("/questions");
      }
    } catch (err) {
      setErrorMessage(err as string);
      console.error(err);
      setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
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
        setErrorMessage(response.error);
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
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
        setErrorMessage("That email or username has already been taken.");
      } else {
        router.push("/questions");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err as string);
      setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
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
        setErrorMessage(response.error);
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
        return;
      }

      if (sessionUser) {
        sessionUser.email = newEmail;
        sessionUser.username = newUsername;
        sessionUser.password = newPassword;
      }

      update({ user: sessionUser });
      console.log(session);
      router.push("/");
    } catch (err) {
      setErrorMessage(err as string);
      console.error(err);
      setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
    }
  };

  const handleProfileDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await deleteUserById(Number(newId));
    if (response.error) {
      setErrorMessage(response.error);
      setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
      return;
    }
    signOut();
  };

  useEffect(() => {
    setNewId(sessionUser.id ?? -1);
    setUsername(sessionUser.username ?? "");
    setEmail(sessionUser.email ?? "");
    setPassword(sessionUser.password ?? "");
  }, [sessionUser]);

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
              status === "authenticated" && sessionUser.oauth !== undefined
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
        <div className="flex flex-col text-center justify-center items-center d-flex flex-column space-y-6">
          {formType === UserManagement.Profile &&
            sessionUser?.oauth !== undefined && (
              <>
                <p className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Linked accounts:
                </p>
                <div className="flex w-1/2 justify-center bg-white rounded py-2 space-x-3">
                  {sessionUser?.oauth?.map((oauth) => (
                    <Image
                      key={oauth}
                      src={`/${oauth}.svg`}
                      alt={oauth}
                      height={25}
                      width={25}
                      className="bg-white"
                    />
                  ))}
                </div>
              </>
            )}
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
      <Alert error={errorMessage} hidden={openAlert} setHide={setOpenAlert} />
    </>
  );
};

export default UserForm;
