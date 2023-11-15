import { Fragment, useState } from "react";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import ModeToggleButton from "./ModeToggleButton";
import Link from "next/link";
import Stopwatch from "./Stopwatch";
import { classNames } from "@/utils/classnames/classnames";
import { useMatchState } from "@/hook/MatchStateContext";
import { MatchedState } from "@/utils/enums/MatchingState";
import Countdown from "./Countdown";
import { useTimer } from "@/hook/timerContext";

const navigation = [
  { name: "Question", href: "/questions", current: false },
  { name: "Collaboration", href: "/collaboration", current: false },
  { name: "History", href: "/history/user", current: false },
];

type NavbarProps = {
  session: Session | null;
};

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const isQuestionPage = currentPath === "/questions/[id]";
  function handleSignOutClick() {
    signOut({ callbackUrl: "/" });
  }
  const { matchState } = useMatchState();
  const { seconds } = useTimer();

  

  return (
    <Disclosure as="nav" className="bg-gray-900 ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div
                className={
                  session
                    ? "absolute inset-y-0 left-0 flex items-center sm:hidden"
                    : "absolute inset-y-0 left-0 hidden"
                }
              >
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {!session ? (
                <>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                      <Link href="/">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                          LeetPal
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <ModeToggleButton />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center">
                      <Link href={"/"}
                        className="cursor-pointer"
                      >
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                          LeetPal
                        </span>
                      </Link>
                    </div>
                      <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              // href={item.href}
                              onClick={() => router.push(item.href)}
                              className={classNames(
                                currentPath === item.href
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                              )}
                              aria-current={
                                currentPath === item.href ? "page" : undefined
                              }
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                  </div>

                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-2">
                      { matchState === MatchedState.MATCHING &&
                        <div className="mx-auto w-10 center">
                          <Countdown counter={seconds} />
                        </div>
                      }
                    {/* <div className="tooltip-container">
                      {matchState === MatchedState.MATCHED && peer ? (
                        <div className="flex">
                          <div
                            className="rounded-full transition duration-300 ease-in-out"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            <Image
                              width="30"
                              height="30"
                              src={peer.image ?? "/avatar.svg"}
                              alt={peer.image ?? "/avatar.svg"}
                            />
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {isTooltipVisible && peer && (
                        <div className="tooltip">{peer.username}</div>
                      )}
                    </div> */}
                    {isQuestionPage && <Stopwatch />}
                    <ModeToggleButton />

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3 navbar-menu">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <Image
                            className="rounded-full transition duration-300 ease-in-out"
                            width="30"
                            height="30"
                            src={session?.user?.image ?? "/avatar.svg"}
                            alt="/avatar.svg"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                      <div className="navbar-menu">
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                              href="/profile"
                              className={classNames(
                                active ? "bg-gray-100 " : "",
                                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                )}
                                >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                              href="#"
                              onClick={() => handleSignOutClick()}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md cursor-pointer"
                                )}
                                >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </div>
                      </Transition>
                    </Menu>
                  </div>
                </>
              )}
            </div>
          </div>

            <Disclosure.Panel className={"sm:hidden"}>
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    onClick={() => router.push(item.href)}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium cursor-pointer"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
export default Navbar;
