import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const USER_URL = "https://63e4ba3dc04baebbcdaa9a7e.mockapi.io/users/";

const initialState = {
  current: {},
  status: false,
  error: null,
};
export const fetchUsers = createAsyncThunk("login/fetchUsers", async () => {
  try {
    const res = await axios.get(USER_URL);
    return [...res.data];
  } catch (error) {
    return error.message;
  }
});
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    vertifyLogin: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { vertifyLogin } = loginSlice.actions;
export default loginSlice.reducer;
