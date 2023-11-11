import useSessionCollab from "@/hook/useSessionCollab";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import React, { Fragment, use, useEffect, useState } from "react";
import ModeToggleButton from "./ModeToggleButton";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { getUserById } from "@/database/user/userService";
import { User } from "@/database/user/entities/user.entity";
import useSessionUser from "@/hook/useSessionUser";
import LoadingModal from "./LoadingModal";

type Props = {
};

export default function SessionCollabNavbar({ }: Props) {
  const { sessionUser, isLoading } = useSessionUser();
  const router = useRouter();
  const sessionId = useRouter().query.sessionId as string;
  const { users } = useSessionCollab(sessionId);
  const [peer, setPeer] = useState<User | null>(null);
  const [isLoadingUser, setIsloadingUser] = useState<boolean>(false)

  useEffect(() => {

    async function getPeerInfo() {
      await getUserById(users.filter((user) => user !== sessionUser.id)[0])
        .then((res) => {
          setPeer(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (!isLoading) {
      setIsloadingUser(true);
      getPeerInfo();
      setIsloadingUser(false);
    }
  }, [isLoading, sessionUser]);

  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };
  return (
    isLoading || isLoadingUser ? (
      <LoadingModal isLoading={isLoading || isLoadingUser} />
    ) : (
    <Disclosure as="nav" className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                LeetPal
              </span>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-2">
            <ModeToggleButton />
            <div className="tooltip-container">
              <div className="flex">
                <div
                  className="rounded-full transition duration-300 ease-in-out border-2 border-blue-500 p-1"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    className="rounded-full transition duration-300 ease-in-out"
                    width="30"
                    height="30"
                    src={peer?.image ?? "/avatar.svg"}
                    alt="/avatar.svg"
                  />
                </div>
              </div>
              {isTooltipVisible && (
                <div className="tooltip">{peer?.username}</div>
              )}
            </div>

            <div className="tooltip-container">
              <div className="flex">
                <div
                  className="rounded-full transition duration-300 ease-in-out border-2 border-blue-500 p-1"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    className="rounded-full transition duration-300 ease-in-out"
                    width="30"
                    height="30"
                    src={sessionUser.image ?? "/avatar.svg"}
                    alt="/avatar.svg"
                  />
                </div>
              </div>
              {isTooltipVisible && (
                <div className="tooltip">
                  <div>{sessionUser.username}</div>
                  <div>{sessionUser.email}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
        </Disclosure>
    )
  );
}
