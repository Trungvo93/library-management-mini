import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = { usersList: [], status: false, error: null };
const USERS_URL = "https://evon.cksvietnam.vn/users";
export const fetchUsers = createAsyncThunk("login/fetchUsers", async () => {
  try {
    const res = await axios.get(USERS_URL);

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
