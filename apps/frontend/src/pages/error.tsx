import { ErrorKey } from "@/utils/enums/ErrorKey";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Error() {
  const router = useRouter();
  const errorMessage = router.query.message ?? "An error occurred"; // Default message
  const errorKey = router.query.errorKey as keyof typeof errorFunctions;

  const errorFunctions = {
    [ErrorKey.OAuthSigninError]: () => {
      signIn();
    }
  };
  
  const handleTryAgain = () => {
    if (errorKey && errorFunctions[errorKey]) {
      errorFunctions[errorKey]();
    }
  };

  return (
    <div className="flex-1 flex h-full items-center">
      <div className="text-center mx-auto mb-6">
        <h2 className="mt-6 text-rose-600 text-4xl">{errorMessage}</h2>
        {/* Attempt to recover by trying to re-render the segment */}
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleTryAgain}>
          Try again
        </button>
      </div>
    </div>
  );
}
