import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { TTheme } from "@/types";
import { setTheme, setPrimaryColor } from "@/features";
import { useAppSelector } from "@/hooks";

export const useTheme = () => {
  const { theme, primaryColor } = useAppSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--color-primary", primaryColor);
  }, [primaryColor]);

  const handleThemeChange = (theme: TTheme) => {
    dispatch(setTheme(theme));
  };

  const handleColorChange = (color: string) => {
    dispatch(setPrimaryColor(color));
  };

  return { theme, primaryColor, handleThemeChange, handleColorChange };
};
