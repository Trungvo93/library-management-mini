import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  current: {},
  status: false,
};
const USERS_URL = `https://637edb84cfdbfd9a63b87c1c.mockapi.io/users`;
export const updatePass = createAsyncThunk(
  "changePassword",
  async (payload) => {
    try {
      const res = await axios.put(`${USERS_URL}/${payload.id}`, payload);
      return { ...res.data };
    } catch (error) {
      return error.message;
    }
  }
);
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    vertifyLogin: (state, action) => {
      console.log("staet: ", action);
      state.current = action.payload;
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePass.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updatePass.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
      })
      .addCase(updatePass.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const { vertifyLogin } = loginSlice.actions;
export default loginSlice.reducer;
