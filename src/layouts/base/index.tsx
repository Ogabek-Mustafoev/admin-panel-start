import { type FC } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components";
import { useAppSelector } from "@/hooks";

export const BaseLayout: FC = () => {
  const { bgImage, bgColor } = useAppSelector((state) => state.theme);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <main
        className="flex-1 overflow-hidden px-6 py-5.5 transition-all duration-500"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundColor: bgColor || "transparent",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};
