import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "@/database/user/entities/user.entity";
import { Role } from "@/utils/enums/Role";

function useSessionUser() {
  const { data: session } = useSession();
  const [sessionUser, setSessionUser] = useState<User>({
    id: -1,
    username: "",
    email: "",
    role: Role.Normal,
  });

  useEffect(() => {
    setSessionUser((prevUser) => ({
      ...prevUser,
      ...session?.user,
    }));
    console.log("session", session);
  }, [session]);
  return { sessionUser, setSessionUser };
}

export default useSessionUser;
