import useSessionByUid from "@/hook/useSessionByUid";
import useSessionUser from "@/hook/useSessionUser";
import React, { useEffect, useMemo, useState } from "react";
import SessionPagination from "./SessionPagination";

type Props = {};

function SessionTable({ }: Props) {
    const sessionsPerPage = useMemo(() => 10, []);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRecord = currentPage * sessionsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - sessionsPerPage;
    const { sessions, isLoading} = useSessionByUid(indexOfFirstRecord, indexOfLastRecord);

    useEffect(() => {
        if (!isLoading) {
                console.log(sessions);
            }
    }, [isLoading, sessions, currentPage]);

  return (
    <>
      <div>SessionTable</div>
      <SessionPagination
        hidden={isLoading}
        sessionsPerPage={sessionsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfSession={sessions.length}
        indexOfFirstRecord={indexOfFirstRecord}
        indexOfLastRecord={indexOfLastRecord}
      />
    </>
  );
}

export default SessionTable;
