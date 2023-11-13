import LoadingModal from "@/components/LoadingModal";
import HistoryTable from "@/components/history/historyTable/HistoryTable";
import useHistories from "@/hook/useHistories";
import useSessionUser from "@/hook/useSessionUser";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function HistoryPage() {
  const { sessionUser } = useSessionUser();
  const router = useRouter();
  const uid = Number(router.query.id);
  const [accessToken, setAccessToken] = useState(sessionUser.accessToken);
  const [refreshToken, setRefreshToken] = useState(sessionUser.refreshToken);
  const { isLoading } = useHistories(uid, accessToken, refreshToken);

  useEffect(() => {
    setAccessToken(sessionUser.accessToken);
    setRefreshToken(sessionUser.refreshToken);

    const redirectUser = () => {
      if (uid !== sessionUser.id) {
        router.push(`/history/user/${sessionUser.id}`);
      }
    };
    return () => redirectUser();
  }, [router, sessionUser, uid]);

  return (
    <div className="grid place-content-center dark:bg-gray-900">
      <LoadingModal isLoading={isLoading} />
      <div className="p-4 rounded-lg w-screen xl:px-60 lg:px-40">
        <HistoryTable hidden={isLoading} />
      </div>
    </div>
  );
}
export default HistoryPage;
