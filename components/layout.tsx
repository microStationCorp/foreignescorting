import React from "react";
import AppBar from "./appbar";
import Footer from "./footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppBar />
      {children}
      <Footer />
    </>
  );
};

export default React.memo(Layout);
