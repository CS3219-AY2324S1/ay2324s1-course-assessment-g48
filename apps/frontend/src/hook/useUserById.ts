import { getUserById } from "@/database/user/userService";
import { useEffect, useState } from "react";
import useSessionUser from "./useSessionUser";
import { useError } from "./ErrorContext";
import { User } from "@/database/user/entities/user.entity";

function useUserById(userIds: number[]) {
  const { isLoadingUser } = useSessionUser();
  const [isLoading, setIsLoading] = useState(true);
  const [userMap, setUserMap] = useState(new Map<number, User>());
  const { setError } = useError();

  useEffect(() => {
    if (!isLoadingUser) {
      setIsLoading(true);
      const promises = userIds.map((user) =>
        getUserById(user)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            setError({
              type: 1,
              message: "Cannot load user image",
            });
          })
      );

      Promise.all(promises)
        .then((users) => {
          const newMap = new Map<number, User>();
          userIds.forEach((userid, index) => {
            newMap.set(userid, users[index]);
          });
          setUserMap(newMap);
          setIsLoading(false);
        })
        .catch((err) => {
          setError({
            type: 1,
            message: "Error fetching user images",
          });
        });
    }
  }, [userIds, isLoadingUser, setError]);

  return {
    isLoading,
    userMap,
  };
}
export default useUserById;
