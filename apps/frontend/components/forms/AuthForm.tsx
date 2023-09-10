import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import router from "next/router";
import React, { useState } from "react";
import { Auth } from "../enums/Auth";
import FormInput from "./FormInput";
import { mockUsers } from "../MockUsers";
import { User } from "../User";

interface AuthFormProps {
  buttonText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ buttonText }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (buttonText === Auth.SignIn) {
      handleEmailSignIn(e);
    }
    if (buttonText === Auth.SignUp) {
      handleEmailSignUp(e);
    }
  };

  const handleEmailSignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
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

  const handleEmailSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {      
      const newId = Math.max(...mockUsers.map((question : User) => question.id), -1) + 1;
      const newUser = { id: newId, username, email, password };

      mockUsers.push(newUser); // not sure how to persist mockUsers 

      // nextauth uses default mockUsers without new user, thats why this fails
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
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

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="alert alert-danger mt-2">{errorMessage}</div>
      )}
      {buttonText === Auth.SignUp && (
        <FormInput
          type="text"
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={setUsername}
        ></FormInput>
      )}
      <FormInput
        type="email"
        label="Email"
        placeholder="Enter your email address"
        value={email}
        onChange={setEmail}
      ></FormInput>
      <FormInput
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={setPassword}
      ></FormInput>
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-warning py-1 px-2 cursor-pointer rounded mt-3"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
