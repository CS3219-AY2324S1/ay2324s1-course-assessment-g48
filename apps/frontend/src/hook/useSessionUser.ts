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
    password: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = setInterval(() => {
      if (session) {
        setSessionUser((prevUser) => ({
          ...prevUser,
          ...session?.user,
        }));
        console.log("session", session);
        clearInterval(checkSession);
        setIsLoading(false);
      }
    }, 500); // Check every 0.5s

    const timeout = setTimeout(() => {
      clearInterval(checkSession);
      setIsLoading(false);
    }, 2000); // Stop checking after 2s

    return () => {
      clearTimeout(timeout);
      clearInterval(checkSession);
    };
  }, [session]);
  return !isLoading ? { sessionUser, setSessionUser } : {sessionUser: { 
    ...sessionUser,
    role: Role.Unknown,
    access_token: session?.user?.accessToken
  }, setSessionUser: setSessionUser};
}

export default useSessionUser;
