import { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingModal from "./LoadingModal";
import SlideOver from "./SlideOver";

const Layout = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [openSlideOver, setOpenSlideOver] = useState(false);

  const redirectToSignIn =
    !session &&
    router.pathname !== "/signin" &&
    router.pathname !== "/signup" &&
    !router.pathname.includes("error");
  const isLoading = status === "loading";

  if (isLoading) {
    return <LoadingModal isLoading={isLoading} />;
  }

  if (redirectToSignIn) {
    signIn();
  }

  return (
    <>
    <div className="dark:bg-gray-900 min-h-screen pb-10 shadow-md overflow-auto">
      {!redirectToSignIn && (
        <>
        <div className="fixed w-screen divide-y top-0 z-10">
          <Navbar session={session} setSlideOver={setOpenSlideOver} openSlideOver={openSlideOver} />
          <div className="border-t divider-neutral-500 over"></div>
        </div>
        <div className="mt-16 px-5 place-content-center w-full">
        {children}
        </div>
        </>
      )}
    </div>
    <SlideOver open={openSlideOver} setOpen={setOpenSlideOver} />
    </>
  );
};

export default Layout;
