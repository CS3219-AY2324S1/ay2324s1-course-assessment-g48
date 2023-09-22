import { UserManagement } from "@/utils/enums/UserManagement";
import UserForm from "@/components/forms/UserForm";
import Link from "next/link";

type signupProps = {};

const signup: React.FC<signupProps> = () => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Welcome to PeerPrep!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <UserForm formType={UserManagement.SignUp} />

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {UserManagement.SignIn} now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default signup;
