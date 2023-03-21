import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  usersList: [],
  userPerPage: [],
  status: false,
  error: null,
};
const USERS_URL = "https://637edb84cfdbfd9a63b87c1c.mockapi.io/users";
export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  try {
    const res = await axios.get(USERS_URL);

    return [...res.data];
  } catch (error) {
    return error.message;
  }
});
export const fetchUserPerPage = createAsyncThunk(
  "fetchUserPerPage",
  async (payload) => {
    try {
      const res = await axios.get(`${USERS_URL}?l=10&&p=${payload}`);

      return [...res.data];
    } catch (error) {
      return error.message;
    }
  }
);
export const deleteUser = createAsyncThunk("deleteUser", async (payload) => {
  try {
    await axios.delete(`${USERS_URL}/${payload}`);
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
      })
      .addCase(fetchUserPerPage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserPerPage.fulfilled, (state, action) => {
        state.userPerPage = action.payload;
      })
      .addCase(fetchUserPerPage.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
