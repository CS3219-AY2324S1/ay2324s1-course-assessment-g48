import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { UserManagement } from "./enums/UserManagement";
import Image from "next/image";
import { useRef, useState } from "react";
import { Overlay, Tooltip } from "react-bootstrap";

type NavbarProps = {
  session: Session | null;
};

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-xxl">
        {session ? (
          <>
            <Link className="navbar-brand" href="/">
              PeerPrep
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href="/history" className="nav-link">
                    History
                  </Link>
                </li>
              </ul>
            </div>
            <div className="d-flex">
              <div className="cursor-pointer group relative px-2">
                <Link href={"/profile"}>
                  <Image
                    src="/avatar.svg"
                    alt="profile image"
                    width="30"
                    height="30"
                    className="rounded-full cursor-pointer group-hover:opacity-80 transition duration-300 ease-in-out"
                    onMouseOver={() => setShow(true)}
                    onMouseOut={() => setShow(false)}
                    ref={target}
                  />
                </Link>
                <Overlay target={target.current} show={show} placement="bottom">
                  {(props) => (
                    <Tooltip
                      {...props}
                      onMouseOver={() => setShow(true)}
                      onMouseOut={() => setShow(false)}
                    >
                      <p className="text-white mb-2">
                        {session.user?.username}
                      </p>
                      <button
                        className="btn btn-outline-warning py-1 px-2 cursor-pointer rounded"
                        onClick={() => signOut()}
                      >
                        {UserManagement.SignOut}
                      </button>
                    </Tooltip>
                  )}
                </Overlay>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link
              className="navbar-brand"
              href="#"
              onClick={() =>
                window.alert("Please sign in first to access PeerPrep!")
              }
            >
              PeerPrep
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
