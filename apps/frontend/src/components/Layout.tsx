import { PropsWithChildren, use, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingModal from "./LoadingModal";
import SlideOver from "./SlideOver";
import { useError } from "@/hook/ErrorContext";
import Alert from "./Alert";

const Layout = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { error, setError, clearError } = useError();
  const [openAlert, setOpenAlert] = useState(false);
  const [openSlideOver, setOpenSlideOver] = useState(false);

  const redirectToSignIn =
    !session &&
    router.pathname !== "/signin" &&
    router.pathname !== "/signup" &&
    !router.pathname.includes("error");
  const isLoading = status === "loading";

  if (redirectToSignIn) {
    signIn();
  }

  useEffect(() => {
    if (error) {
      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 3000);
      clearError();
    }
  }, [error]);

  if (isLoading) {
    return <LoadingModal isLoading={isLoading} />;
  }

  return (
    <>
      <div className="dark:bg-gray-900 min-h-screen pb-10 shadow-md overflow-auto">
        {!redirectToSignIn && (
          <>
            <div className="fixed w-screen divide-y top-0 z-20">
              <Navbar
                session={session}
                setSlideOver={setOpenSlideOver}
                openSlideOver={openSlideOver}
              />
              <div className="border-t divider-neutral-500 over"></div>
            </div>
            <div className="mt-16 px-5 place-content-center w-full">
              {children}
            </div>
          </>
        )}
      </div>
      <SlideOver open={openSlideOver} setOpen={setOpenSlideOver} />
      {error && (
        <Alert message={error} hidden={openAlert} setHide={setOpenAlert} />
      )}
    </>
  );
};

export default Layout;
