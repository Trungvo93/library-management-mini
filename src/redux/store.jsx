import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import usersSlice from "./usersSlice";
import updateUser from "./updateUser";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    users: usersSlice,
    updateUser: updateUser,
  },
});
