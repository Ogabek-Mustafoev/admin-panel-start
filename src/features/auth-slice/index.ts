import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@/schema/user";

interface IInitialState {
  user?: IUser;
}

const initialState: IInitialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = undefined;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
