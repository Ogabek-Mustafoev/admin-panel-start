import { configureStore } from "@reduxjs/toolkit";
import { collapseReducer, authReducer, themeReducer } from "@/features";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    collapse: collapseReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
