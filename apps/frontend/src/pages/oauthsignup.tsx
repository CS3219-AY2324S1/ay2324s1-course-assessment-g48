import Alert from "@/components/Alert";
import FormInput from "@/components/forms/FormInput";
import { User } from "@/database/user/entities/user.entity";
import { createNewUser } from "@/database/user/userService";
import { useError } from "@/hook/ErrorContext";
import useSessionUser from "@/hook/useSessionUser";
import { OAuthType } from "@/utils/enums/OAuthType";
import { Role } from "@/utils/enums/Role";
import { UserManagement } from "@/utils/enums/UserManagement";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

export default function OauthSignUp() {
  const { sessionUser } = useSessionUser();
  const [newUsername, setUsername] = useState(sessionUser.username);
  const { setError } = useError();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  
  const router = useRouter();
  const email = router.query.email!;
  const oauth = router.query.oauth;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const newUser: Omit<User, "id" | "password"> = {
        username: newUsername,
        email: email as string,
        oauth: [oauth as OAuthType],
        role: Role.Normal,
      };

      console.log("picture", sessionUser);

      const response = await createNewUser(newUser);
      if (response.error) {
        setError({
          type: 1,
          message: response.error
        });
        return;
      }

      console.log("Sign up successful, now trying to sign in");

      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        oauth: oauth,
        callbackUrl,
      });

      if (result?.error) {
        console.log(result?.error);
        setError({
          type: 1,
          message: "That email or username has already been taken."
        });
      } else {
        router.push("/questions");
      }
    } catch (err) {
      console.log({
        type: 1,
        mesaage: err || "Error undefined???"});
    }
  };
  
  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="lg:mx-auto lg:w-full lg:max-w-lg">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Thank you for signing up with Peerprep
          </h2>

          <h4 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-600 dark:text-white">
            Please set your username
          </h4>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
          <div>
            <FormInput
              type="text"
              label="Username"
              value={newUsername!}
              onChange={setUsername}
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {UserManagement.SignUp}
          </button>
        </form>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
            Existing member?{" "}
            <Link
              href="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {UserManagement.SignIn} now
            </Link>
          </p>
      </div>
    </>
  )
}