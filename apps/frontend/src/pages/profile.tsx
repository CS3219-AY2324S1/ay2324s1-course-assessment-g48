import UserForm from "../components/forms/UserForm";
import { UserManagement } from "../components/enums/UserManagement";
import { useSession } from "next-auth/react";

export default function Signup() {
  const { data: session } = useSession();
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-light border-light">
            <div className="card-header text-center border-light">
              <h1 className="mb-2">Edit Profile</h1>
            </div>
            <div className="card-body">
              <UserForm
                formType={UserManagement.Profile}
                username={session?.user?.username}
                email={session?.user?.email}
                password={session?.user?.password}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
