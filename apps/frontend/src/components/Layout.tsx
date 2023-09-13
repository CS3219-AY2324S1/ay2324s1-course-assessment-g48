import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-vh-100 bg-dark">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
