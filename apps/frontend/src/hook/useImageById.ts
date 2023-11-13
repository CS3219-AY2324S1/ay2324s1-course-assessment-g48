import { getUserById } from "@/database/user/userService";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import useSessionUser from "./useSessionUser";
import { useError } from "./ErrorContext";
import { number } from "prop-types";

function useImageById(userIds: number[]) {
  const { isLoading: isLoadingUser } = useSessionUser();
  const [isLoading, setIsLoading] = useState(true);
  const [imageMap, setImageMap] = useState(new Map<number, string>());
  const { setError } = useError();

  useEffect(() => {
    if (!isLoadingUser) {
      setIsLoading(true);
      const promises = userIds.map((user) =>
        getUserById(user)
          .then((data) => data.image)
          .catch((err) => {
            setError({
              type: 1,
              message: "Cannot load user image",
            });
          })
      );

      Promise.all(promises)
        .then((images) => {
          const newMap = new Map<number, string>();
          userIds.forEach((user, index) => {
            newMap.set(user, images[index]);
          });
          setImageMap(newMap);
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
    imageMap,
  };
}
export default useImageById;
