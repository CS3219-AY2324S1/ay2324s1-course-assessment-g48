import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "@/database/user/entities/user.entity";
import { Role } from "@/utils/enums/Role";

function useSessionUser() {
  const { data: session } = useSession();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [sessionUser, setSessionUser] = useState<User>(
    session?.user ?? {
      id: -1,
      username: "",
      email: "",
      password: "",
    }
  );

  useEffect(() => {
    const checkSession = setInterval(() => {
      if (session) {
        setSessionUser((prevUser) => ({
          ...prevUser,
          ...session?.user,
        }));
        console.log("session", session);
        clearInterval(checkSession);
        setIsLoadingUser(false);
      }
    }, 500); // Check every 0.5s

    const timeout = setTimeout(() => {
      clearInterval(checkSession);
      setIsLoadingUser(false);
    }, 2000); // Stop checking after 2s

    return () => {
      clearTimeout(timeout);
      clearInterval(checkSession);
    };
  }, [session]);
  return !isLoadingUser
    ? {
        sessionUser: {
          ...sessionUser,
          accessToken: session?.user?.accessToken ?? undefined,
          refreshToken: session?.user?.refreshToken ?? undefined,
        },
        setSessionUser,
        isLoadingUser
      }
    : {
        sessionUser: {
          ...sessionUser,
          role: Role.Unknown,
          accessToken: null,
          refreshToken: null,
        },
        setSessionUser,
        isLoadingUser
      };
}

export default useSessionUser;
