import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  usersList: [],
  userPerPage: [],
  usersFindLenght: [],
  isLoading: false,
  error: null,
};
const USERS_URL = "https://637edb84cfdbfd9a63b87c1c.mockapi.io/users";
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const res = await axios.get(USERS_URL);

    return [...res.data];
  } catch (error) {
    return error.message;
  }
});
export const fetchUserPerPage = createAsyncThunk(
  "users/fetchUserPerPage",
  async (payload) => {
    try {
      if (!payload.value) {
        const res = await axios.get(
          `${USERS_URL}?limit=10&&page=${payload.indexPage}`
        );
        return [...res.data];
      } else {
        const res = await axios.get(
          `${USERS_URL}?${payload.type}=${payload.value}&&limit=10&&page=${payload.indexPage}`
        );
        return [...res.data];
      }
    } catch (error) {
      return error.message;
    }
  }
);

export const usersFindLenght = createAsyncThunk(
  "users/usersFindLenght",
  async (payload) => {
    try {
      const res = await axios.get(
        `${USERS_URL}?${payload.type}=${payload.value}`
      );
      return [...res.data];
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (payload) => {
    try {
      await axios.delete(`${USERS_URL}/${payload}`);
    } catch (error) {
      return error.message;
    }
  }
);
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersList = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserPerPage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUserPerPage.fulfilled, (state, action) => {
        state.isLoading = false;

        state.userPerPage = action.payload;
      })
      .addCase(fetchUserPerPage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(usersFindLenght.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(usersFindLenght.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersFindLenght = action.payload;
      })
      .addCase(usersFindLenght.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
