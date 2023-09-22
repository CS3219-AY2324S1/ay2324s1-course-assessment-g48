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
    <div className="dark:bg-gray-900 min-h-screen shadow-md">
      {!redirectToSignIn && (
        <div className="flex flex-col h-screen divide-y divide-neutral-500 mx-auto">
          <Navbar session={session} setSlideOver={setOpenSlideOver} openSlideOver={openSlideOver} />
          {children}
        </div>
      )}
    </div>
    <SlideOver open={openSlideOver} setOpen={setOpenSlideOver} />
    </>
  );
};

export default Layout;
