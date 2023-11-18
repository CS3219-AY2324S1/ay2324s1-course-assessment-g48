import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session } = useSession();
  return (
    <div className="flex h-[calc(100vh-60px)] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-slate-200">
            A platform for code collaboration to enrich your technical interview
            skills
          </h1>
          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Leetpal serves as an engaging coding platform tailored for
            practicing coding interview questions. Whether you prefer
            independent practice or collaborative sessions, you can commence
            coding immediately!
          </p>
          {!session && (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signin"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer dark:text-slate-200"
              >
                Sign up <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
