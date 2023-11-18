import useSessionCollab from "@/hook/useSessionCollab";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ModeToggleButton from "./ModeToggleButton";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import useSessionUser from "@/hook/useSessionUser";
import useUserById from "@/hook/useUserById";

type Props = {};

export default function SessionCollabNavbar({}: Props) {
  const { isLoadingUser: isLoading } = useSessionUser();
  const sessionId = useRouter().query.sessionId as string;
  const { users } = useSessionCollab(sessionId);
  const { userMap, isLoading: isLoadingUserMap } = useUserById(users);

  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };
  return (
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

            {isLoading || isLoadingUserMap ? (
              <> </>
            ) : (
              users.map((id) => (
                <div className="tooltip-container" key={id}>
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
                        src={userMap.get(id)?.image ?? "/avatar.svg"}
                        alt="/avatar.svg"
                      />
                    </div>
                  </div>
                  {isTooltipVisible && (
                    <div className="tooltip">
                      <div>{userMap.get(id)?.username}</div>
                      <div>{userMap.get(id)?.email}</div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
