import UserForm from "../components/forms/UserForm";
import { UserManagement } from "../../enums/UserManagement";
import { signIn } from "next-auth/react";

export default function Signup() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-light border-light">
            <div className="card-header text-center border-light">
              <h1 className="mb-2">Sign up with PeerPrep</h1>
            </div>
            <div className="card-body">
              <UserForm formType={UserManagement.SignUp} />
              <div className="text-center d-flex mt-3 justify-content-center">
                <p className="mb-0 py-1">
                  <em>Already have an existing account?</em>
                </p>
                <button
                  className="btn btn-link text-light py-1 px-2"
                  onClick={() => signIn()}
                >
                  {UserManagement.SignIn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
