import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Error() {
  const router = useRouter();
  console.log(router.query);
  const errorMessage = router.query.message || "An error occurred"; // Default message
  const errorKey = router.query.errorKey as keyof typeof errorFunctions;

  const errorFunctions = {
    OAuthSigninError: () => {
      signIn();
    }
  };
  
  const handleTryAgain = () => {
    if (errorKey && errorFunctions[errorKey]) {
      errorFunctions[errorKey]();
    }
  };

  return (
    <div className="container-xxl text-center mt-5">
      <h2 className="text-white">{errorMessage}</h2>
      {/* Attempt to recover by trying to re-render the segment */}
      <button className="btn btn-warning mt-3" onClick={handleTryAgain}>
        Try again
      </button>
    </div>
  );
}
