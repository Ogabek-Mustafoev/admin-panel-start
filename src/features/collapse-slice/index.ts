import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false
}

const collapseSlice = createSlice({
  name: "collapse",
  initialState,
  reducers: {
    toggleCollapse(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    setCollapse(state, action) {
      state.isCollapsed = action.payload;
    }
  }
});

export const {toggleCollapse, setCollapse} = collapseSlice.actions;
export default collapseSlice.reducer;
