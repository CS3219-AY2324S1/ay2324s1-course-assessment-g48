import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "@/database/user/entities/user.entity";

function useSessionUser() {
  const { data: session } = useSession();
  const [sessionUser, setSessionUser] = useState<User|null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  useEffect(() => {
    const checkSession = setInterval(() => {
      if (session) {
        setSessionUser((prevUser:any) => ({
          ...prevUser,
          ...session?.user,
        }));
        console.log("session", session);
        clearInterval(checkSession);
        setIsLoading(false);
      }
    }, 100); // Check every 0.1s

    const timeout = setTimeout(() => {
      clearInterval(checkSession);
      setIsLoading(false);
    }, 2000); // Stop checking after 2s

    return () => {
      clearTimeout(timeout);
      clearInterval(checkSession);
    };
  }, [session]);
  return !isLoading ? { sessionUser, setSessionUser } : {sessionUser: null, setSessionUser: setSessionUser};
}

export default useSessionUser;
