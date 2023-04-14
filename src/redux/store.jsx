import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import usersSlice from "./usersSlice";
import booksSlice from "./booksSlice";
import loansSlice from "./loansSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    users: usersSlice,
    books: booksSlice,
    loans: loansSlice,
  },
});
