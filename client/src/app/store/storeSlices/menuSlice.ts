import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  path: "",
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setActiveItem: (state, actions) => {
      state.path = actions.payload;
    },
  },
});

export const { setActiveItem } = menuSlice.actions;
export default menuSlice.reducer;
