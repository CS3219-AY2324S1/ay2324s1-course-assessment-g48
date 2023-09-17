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
  updateUserById,
} from "@/database/user/userService";
import { OAuthType } from "@/utils/enums/OAuthType";

interface UserFormProps {
  formType: string;
  id?: number;
  email?: string;
  username?: string;
  password?: string;
  oauth?: OAuthType[]
}

const UserForm: React.FC<UserFormProps> = ({
  formType,
  id,
  email,
  username,
  password,
  oauth
}) => {
  const { data: session, status, update } = useSession()
  const [newUsername, setUsername] = useState(username ?? "");
  const [newEmail, setEmail] = useState(email ?? "");
  const [newPassword, setPassword] = useState(password ?? "");
  const [errorMessage, setErrorMessage] = useState("");
  const [newId, setNewId] = useState(id ?? -1);

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
      } else {
        router.push("/");
      }
    } catch (err) {
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
        oauth: oauth
      };

      const response = await createNewUser(newUser);
      if (response.error) {
        setErrorMessage(response.error);
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
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err as string);
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
        oauth: oauth
      };

      const response = await updateUserById(id, newUser);
      if (response.error) {
        setErrorMessage(response.error);
        return;
      }

      if (session?.user) {
        session.user.email = newEmail;
        session.user.username = newUsername;
        session.user.password = newPassword;
      }

      update({ user: session?.user });
      console.log(session);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await deleteUserById(Number(id));
    if (response.error) {
      setErrorMessage(response.error);
      return;
    }
    signOut();
  };

  console.log(status === "authenticated");
  console.log(oauth?.length);
  console.log(oauth);

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="alert alert-danger mt-2">{errorMessage}</div>
      )}
      {formType !== UserManagement.SignIn && (
        <FormInput
          type="text"
          label="Username"
          placeholder="Enter your username"
          value={newUsername}
          onChange={setUsername}
        ></FormInput>
      )}
      {/* TODO: add tooltip when email is disabled due to Oauth */}
      <FormInput
        type="email"
        label="Email"
        placeholder="Enter your email address"
        disabled={status === "authenticated" && oauth !== undefined}
        value={newEmail}
        onChange={setEmail}
      ></FormInput>
      <FormInput
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={newPassword}
        onChange={setPassword}
      ></FormInput>
      <div className="text-center d-flex flex-column">
        <button
          type="submit"
          className="btn btn-warning py-1 px-2 cursor-pointer rounded mt-3"
        >
          {formType === UserManagement.Profile ? "Save Changes" : formType}
        </button>
        {formType === UserManagement.Profile && (
          <button
            className="btn btn-danger py-1 px-2 cursor-pointer rounded mt-3"
            onClick={handleProfileDelete}
          >
            Delete Profile
          </button>
          // TODO: Create link Oauth accounts buttons. If no OAuth left, user must set password
        )}
      </div>
    </form>
  );
};

export default UserForm;
