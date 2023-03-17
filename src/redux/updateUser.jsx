import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = { current: {}, status: false };
const USER_URL = "https://evon.cksvietnam.vn/users";
export const fetchUser = createAsyncThunk("updateUser", async (payload) => {
  try {
    const res = await axios.get(`${USER_URL}/${payload.id}`);

    return { ...res.data };
  } catch (error) {
    return error.message;
  }
});
export const updateUser = createSlice({
  name: "user",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default updateUser.reducer;
