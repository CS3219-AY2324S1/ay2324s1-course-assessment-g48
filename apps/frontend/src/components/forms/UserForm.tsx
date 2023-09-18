import { signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { UserManagement } from "../../utils/enums/UserManagement";
import FormInput from "./FormInput";
import { UpdateUserDto, User } from "@/database/user/entities/user.entity";
import { mockUsers } from "@/database/user/mockUsers";
import {
  createNewUser,
  deleteUserById,
  updateUserById,
} from "@/database/user/userService";
import useProfile from "@/hook/useProfile";

interface UserFormProps {
  formType: string;
  username?: string;
  email?: string;
  password?: string;
  id?: number;
}

const UserForm: React.FC<UserFormProps> = ({
  formType,
  username,
  email,
  password,
  id,
}) => {
  const {profile} = useProfile();
  const [newUsername, setUsername] = useState(profile.username);
  const [newEmail, setEmail] = useState(profile.email ?? "");
  const [newPassword, setPassword] = useState(password ?? "");
  const [errorMessage, setErrorMessage] = useState("");
  const [newId, setNewId] = useState(profile.id ?? -1);

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
        router.push("/questions");
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
      };

      const response = await createNewUser(newUser);
      if (response.error) {
        setErrorMessage(response.error);
        return;
      }

      // nextauth uses default mockUsers without new user, thats why this fails
      const result = await signIn("credentials", {
        redirect: false,
        email: newEmail,
        password: newPassword,
        callbackUrl,
      });

      if (result?.error) {
        setErrorMessage("That email or username has already been taken.");
      } else {
        router.push("/questions");
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
      };

      const response = await updateUserById(id, newUser);
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
        setErrorMessage("Invalid email or username.");
      } else {
        router.push("/questions");
      }
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

  useEffect(() => {
    setUsername(profile.username ?? "");
    setEmail(profile.email ?? "");
  },[profile])

  return (
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
      <div>
      <FormInput
        type="email"
        label="Email address"
        value={newEmail}
        autoComplete="email"
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
      <div className="text-center d-flex flex-column space-y-6">
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
  );
};

export default UserForm;
