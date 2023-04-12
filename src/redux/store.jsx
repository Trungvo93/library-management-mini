import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import usersSlice from "./usersSlice";
import booksSlice from "./booksSlice";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    users: usersSlice,
    books: booksSlice,
  },
});
