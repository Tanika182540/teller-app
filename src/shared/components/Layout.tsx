import React from "react";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col size-full min-h-screen">
    <Header />
    <main className="flex-1">{children}</main>
  </div>
  );
};

export default Layout;
