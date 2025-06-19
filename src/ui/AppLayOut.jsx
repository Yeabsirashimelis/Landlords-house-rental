"use client";

import { Outlet } from "react-router-dom";
import HomeTop from "../features/home/HomeTop";

function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <HomeTop />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
