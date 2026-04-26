import { type FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getBackground } from "@/utils/db";
import { setBgImage } from "@/features";

export const BaseLayout: FC = () => {
  const { bgImage, bgColor } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadBackground = async () => {
      if (!bgImage && !bgColor) {
        const savedBg = await getBackground();
        if (savedBg) {
          dispatch(setBgImage(savedBg));
        }
      }
    };
    loadBackground();
  }, [bgImage, bgColor]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <main
        className="flex-1 px-6 py-5.5 transition-all duration-500"
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
