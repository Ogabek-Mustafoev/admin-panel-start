import { type FC } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components";

export const BaseLayout: FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <main className={`flex-1 px-6 py-5.5`}>
        <Outlet />
      </main>
    </div>
  );
};
