import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  current: {},
  status: false,
};
const USER_URL = `https://evon.cksvietnam.vn/users`;
export const updatePass = createAsyncThunk(
  "changePassword",
  async (payload) => {
    try {
      const res = await axios.put(`${USER_URL}/${payload.id}`, payload);
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
