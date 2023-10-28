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
  const [userRole, setUserRole] = useState(sessionUser.role);
  const { isLoading } = useHistories(uid, userRole);

  const redirectUser = () => {
    if (uid !== sessionUser.id) {
      console.log("sessionUser.id: ", sessionUser.id);
      router.push(`/history/user/${sessionUser.id}`);
    }
  }

  useEffect(() => {
    setUserRole(sessionUser.role);
    return () => redirectUser();
  }, [sessionUser]);

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
