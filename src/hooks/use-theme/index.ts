import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { TTheme } from "@/types";
import { useAppSelector } from "@/hooks";
import { setTheme, setPrimaryColor, setBgColor, setBgImage } from "@/features";

import { PREDEFINED_BG_COLORS } from "@/constants/data";

import { getBackground, removeBackgroundFromDB } from "@/utils/db";

export const useTheme = () => {
  const { theme, primaryColor, bgColor, bgImage } = useAppSelector(
    (state) => state.theme,
  );
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
    const loadSavedBg = async () => { 
      if (!bgImage && !localStorage.getItem("bgColor")) {
        const savedBg = await getBackground();
        if (savedBg) {
          dispatch(setBgImage(savedBg));
        }
      }
    };
    loadSavedBg();
  }, []);

  useEffect(() => {
    if (bgImage) return;

    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    const availableColors = isDark
      ? PREDEFINED_BG_COLORS.dark
      : PREDEFINED_BG_COLORS.light;

    if (!bgColor || !availableColors.includes(bgColor)) {
      dispatch(setBgColor(availableColors[0]));
    }
  }, [theme, bgImage, bgColor]);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
  }, [primaryColor]);

  const handleThemeChange = (theme: TTheme) => {
    dispatch(setTheme(theme));
  };

  const handleColorChange = (color: string) => {
    dispatch(setPrimaryColor(color));
  };

  const handleBgColorChange = async (color: string | null) => {
    if (color) {
      localStorage.setItem("bgColor", color);
      await removeBackgroundFromDB();
    } else {
      localStorage.removeItem("bgColor");
    }
    dispatch(setBgColor(color));
  };

  return {
    theme,
    primaryColor,
    bgColor,
    handleThemeChange,
    handleColorChange,
    handleBgColorChange,
  };
};
