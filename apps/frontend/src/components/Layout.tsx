import { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";
import LoadingModal from "./LoadingModal";
import SlideOver from "./SlideOver";

const Layout = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession();
  const [openSlideOver, setOpenSlideOver] = useState(false);

  const isLoading = status === "loading";

  if (isLoading) {
    return <LoadingModal isLoading={isLoading} />;
  }

  return (
    <>
    <div className="dark:bg-gray-900 min-h-screen shadow-md">
      <div className="flex flex-col h-screen divide-y divide-neutral-500 mx-auto">
        <Navbar session={session} setSlideOver={setOpenSlideOver} openSlideOver={openSlideOver} />
        <div className="px-5">
        {children}
        </div>
      </div>
    </div>
    <SlideOver open={openSlideOver} setOpen={setOpenSlideOver} />
    </>
  );
};

export default Layout;
