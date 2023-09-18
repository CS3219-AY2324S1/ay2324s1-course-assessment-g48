import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Profile } from "../../type/Profile";
import { User } from "next-auth";

function useProfile() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<Profile>({
    id: -1,
    username: "",
    email: ""
  });

  useEffect(() => {
    setProfile({
      id: session?.user?.id as number,
      username: session?.user?.username as string,
      email: session?.user?.email as string
    });
    console.log("session", session);
  }, [session]);
  return { profile, setProfile };
}

export default useProfile;
