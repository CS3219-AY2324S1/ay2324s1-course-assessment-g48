import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Custom401 = () => {
  return (
    <>
      <main className="grid h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-2xl font-semibold text-indigo-600">401</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-slate-200">
            Unauthorised Access
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Either you entered a page you didn't have permission to, or you are
            not signed in to the right account. Please click below to sign
            in/register.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              onClick={() => signIn()}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              Sign in/Register
            </a>
            <a
              href="#"
              className="text-sm font-semibold text-gray-900 dark:text-slate-200"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Custom401;
