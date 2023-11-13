import useSessionByUid from "@/hook/useSessionByUid";
import useSessionUser from "@/hook/useSessionUser";
import React, { useEffect, useMemo, useState } from "react";
import SessionPagination from "./SessionPagination";
import useImageById from "@/hook/useImageById";
import Image from "next/image";

type Props = {};

function SessionTable({}: Props) {
  const sessionsPerPage = useMemo(() => 10, []);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * sessionsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - sessionsPerPage;
  const [users, setUsers] = useState<number[]>([]);
  const { sessions, isLoading: isLoadingSession } = useSessionByUid(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  useEffect(() => {
    if (!isLoadingSession) {
      const set = new Set<number>();
      sessions.forEach((session) => {
        session.users.forEach((id) => {
          set.add(id);
        });
      });
      const uniqueUsers = Array.from(set);
      setUsers(uniqueUsers);
    }
  }, [isLoadingSession, sessions, currentPage, setUsers]);
  const { imageMap, isLoading: isLoadingImage } = useImageById(users);


  return isLoadingImage && isLoadingSession ? (
    <></>
  ) : (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg dark:bg-gray-800 max-h-[calc(100vh-190px)]">
        <table
          className="relative table-auto text-sm text-left text-gray-500 dark:text-gray-400 w-full">
          <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                S/N
              </th>
              <th scope="col" className="px-6 py-3 w-1/2">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Participants
              </th>
              <th scope="col" className="px-6 py-3">
                Join
              </th>
            </tr>
          </thead>

          <tbody>
            {sessions.map((session, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th scope="row" className="py-2 center">
                  {index + 1}
                </th>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer">
                  {session._id}
                </td>
                <td className="flex -space-x-1 overflow-hidden px-6 py-4">
                  {session.users.map((user, index) => (
                    <Image
                      key={index}
                      className="rounded-full transition duration-300 ease-in-out"
                      width="30"
                      height="30"
                      src={imageMap.get(user) ?? "/light_avatar.svg"}
                      alt="/avatar.svg"
                    />
                  ))}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => window.open(`/session/${session._id}`)}
                  >
                    Join
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SessionPagination
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
