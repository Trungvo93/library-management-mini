import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import usersSlice from "./usersSlice";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    users: usersSlice,
  },
});
