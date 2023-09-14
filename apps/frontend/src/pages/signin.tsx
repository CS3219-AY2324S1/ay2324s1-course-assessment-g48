import UserForm from "../components/forms/UserForm";
import { UserManagement } from "../utils/enums/UserManagement";
import { useRouter } from "next/router";
import Image from "next/image";
import { signIn } from "next-auth/react";
import OAuthButton from "@/components/forms/OAuthButton";

export default function Signin() {
  const router = useRouter();
  const handleSignUpRedirect = () => {
    router.push("/signup");
  };
  const handleGoogleSignIn = async () => {
    signIn("google", { callbackUrl: "/" });
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-light border-light">
            <div className="card-header text-center border-light">
              <h1 className="mb-2">Sign in to PeerPrep</h1>
            </div>
            <div className="card-body">
              <UserForm formType={UserManagement.SignIn} />
              <div className="text-center d-flex mt-3 justify-content-center">
                <p className="mb-0 py-1">
                  <em>New to PeerPrep?</em>
                </p>
                <button
                  className="btn btn-link text-light py-1 px-2"
                  onClick={handleSignUpRedirect}
                >
                  {UserManagement.SignUp}
                </button>
              </div>
              <OAuthButton provider="google"></OAuthButton>
              <OAuthButton provider="github"></OAuthButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
