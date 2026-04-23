import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IInitialData } from "@/types";

interface IInitialState {
  data?: IInitialData;
}

const initialState: IInitialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action: PayloadAction<IInitialData>) {
      state.data = action.payload;
    },
    logOut(state) {
      state.data = undefined;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
