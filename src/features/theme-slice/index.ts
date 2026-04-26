import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TTheme } from "@/types";

interface ThemeState {
  theme: TTheme;
  bgImage: string | null;
  primaryColor: string;
}

const initialState: ThemeState = {
  theme: (localStorage.theme || "system") as TTheme,
  bgImage: null,
  primaryColor: localStorage.getItem("primaryColor") || "#355872",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme(state, action: PayloadAction<TTheme>) {
      state.theme = action.payload;
      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else if (state.theme === "light") {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "system";
      }
    },
    setBgImage(state, action: PayloadAction<string | null>) {
      state.bgImage = action.payload;
    },
    setPrimaryColor(state, action: PayloadAction<string>) {
      state.primaryColor = action.payload;
      localStorage.setItem("primaryColor", action.payload);
    },
  },
});

export const { toggleTheme, setTheme, setBgImage, setPrimaryColor } = themeSlice.actions;
export default themeSlice.reducer;
