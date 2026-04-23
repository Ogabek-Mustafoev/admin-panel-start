import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isDark: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
    setTheme(state, action: PayloadAction<boolean>) {
      state.isDark = action.payload;
      if (state.isDark) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
