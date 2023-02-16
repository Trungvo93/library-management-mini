import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: {},
  status: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    vertifyLogin: (state, action) => {
      state.current = action.payload;
      state.status = "succeeded";
    },
  },
});

export const { vertifyLogin } = loginSlice.actions;
export default loginSlice.reducer;
