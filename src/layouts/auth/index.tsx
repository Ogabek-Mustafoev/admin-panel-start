import { type FC } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks";

export const AuthLayout: FC = () => {
  const { bgImage, bgColor } = useAppSelector(state => state.theme);

  return (
    <main
      className="h-screen w-screen overflow-hidden transition-all duration-500"
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
  );
};
