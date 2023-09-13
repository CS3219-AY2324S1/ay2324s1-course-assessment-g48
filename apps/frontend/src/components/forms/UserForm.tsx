import { signIn, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import router from "next/router";
import React, { useState } from "react";
import { UserManagement } from "../../../enums/UserManagement";
import FormInput from "./FormInput";

interface UserFormProps {
  formType: string;
  username?: string;
  email?: string;
  password?: string;
}

const UserForm: React.FC<UserFormProps> = ({
  formType,
  username,
  email,
  password,
}) => {
  const [newUsername, setUsername] = useState(username ?? "");
  const [newEmail, setEmail] = useState(email ?? "");
  const [newPassword, setPassword] = useState(password ?? "");
  const [errorMessage, setErrorMessage] = useState("");

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
      // TODO: add user to database here

      // nextauth uses default mockUsers without new user, thats why this fails
      const result = await signIn("credentials", {
        redirect: false,
        email: newEmail,
        password: newPassword,
        callbackUrl,
      });

      if (result?.error) {
        setErrorMessage(result.error);
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
    
    //TODO: update user in database here

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

  const handleProfileDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signOut();
    // TODO: Delete user from database here
  };

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
      <FormInput
        type="email"
        label="Email"
        placeholder="Enter your email address"
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
        )}
      </div>
    </form>
  );
};

export default UserForm;
