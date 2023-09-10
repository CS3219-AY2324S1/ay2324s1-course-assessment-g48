import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { Auth } from "./enums/Auth";

type NavbarProps = {
  session: Session | null;
};

const Navbar: React.FC<NavbarProps> = ({ session }) => {
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
            <div className="d-flex flex-row-reverse">
              <button
                className="btn btn-outline-warning py-1 px-2 cursor-pointer rounded"
                onClick={() => signOut()}
              >
                {Auth.SignOut}
              </button>
            </div>
          </>
        ) : (
          <>
            <Link
              className="navbar-brand"
              href="#"
              onClick={() => window.alert("Please sign in first to access PeerPrep!")}
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
