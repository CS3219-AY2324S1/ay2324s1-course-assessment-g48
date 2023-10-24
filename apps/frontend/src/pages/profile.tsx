import LoadingModal from "@/components/LoadingModal";
import UserForm from "@/components/forms/UserForm";
import useSessionUser from "@/hook/useSessionUser";
import { Role } from "@/utils/enums/Role";
import { UserManagement } from "@/utils/enums/UserManagement";
import router from "next/router";
import React, { useEffect, useState } from "react";

type profileProps = {};

const Profile: React.FC<profileProps> = () => {
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser.role);

  useEffect(() => {
    setUserRole(sessionUser.role);
  }, [sessionUser]);

  if (userRole == Role.Unknown) {
    return <LoadingModal isLoading={true} />;
  }

  if (userRole == undefined) {
    router.push("/401");
    return;
  }
  
  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            My Profile
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <UserForm
            formType={UserManagement.Profile}
          />
        </div>
      </div>
    </>
  );
};
export default Profile;
