import { PropsWithChildren, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";
import LoadingModal from "./LoadingModal";
import { useError } from "@/hook/ErrorContext";
import Alert from "./Alert";
import { useRouter } from "next/router";
import SessionCollabNavbar from "./SessionCollabNavbar";

const Layout = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession();
  const { error, clearError } = useError();
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;
  const isSessionPage = currentPath === "/session/[sessionId]";

  const isLoading = status === "loading";

  useEffect(() => {
    if (error) {
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
        setTimeout(() => {
          clearError();
        }, 300);
      }, 3000);
    }
  }, [error]);

  if (isLoading) {
    return <LoadingModal isLoading={isLoading} />;
  }

  return (
    <>
      <div className="dark:bg-gray-900 min-h-screen shadow-md overflow-auto">
        <>
          <div className="fixed w-screen divide-y top-0 z-20">
            {isSessionPage ? (
              <SessionCollabNavbar  />
            ) : (
              <Navbar session={session} />
            )}

            <div className="border-t divider-neutral-500 over"></div>
          </div>
          <div className="mt-16 px-5 place-content-center w-full">
            {children}
          </div>
        </>
      </div>
      {error && (
        <Alert error={error} hidden={openAlert} setHide={setOpenAlert} />
      )}
    </>
  );
};

export default Layout;
