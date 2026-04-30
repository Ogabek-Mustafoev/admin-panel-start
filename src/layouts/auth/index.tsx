import { type FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getBackground } from "@/utils/db";
import { setBgImage } from "@/features";

export const AuthLayout: FC = () => {
  const { bgImage, bgColor } = useAppSelector(state => state.theme);
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
