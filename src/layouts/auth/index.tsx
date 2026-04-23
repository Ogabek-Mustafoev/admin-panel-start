import type { FC } from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout: FC = () => {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <Outlet />
    </main>
  );
};
