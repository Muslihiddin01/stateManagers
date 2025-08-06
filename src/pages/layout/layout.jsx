import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full max-w-[1700px] mx-auto p-3">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
