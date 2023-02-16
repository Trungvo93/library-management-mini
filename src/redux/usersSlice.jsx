import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = { usersList: [], status: false, error: null };
const USER_URL = "https://63e4ba3dc04baebbcdaa9a7e.mockapi.io/users/";
export const fetchUsers = createAsyncThunk("login/fetchUsers", async () => {
  try {
    const res = await axios.get(USER_URL);

    return [...res.data];
  } catch (error) {
    return error.message;
  }
});
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.usersList = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
