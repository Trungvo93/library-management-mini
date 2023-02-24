import React from "react";
import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom";
import Login from "./Login";
import Layout from "./Layout";
import RecoveryPass from "./RecoveryPass";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { CookiesProvider } from "react-cookie";
import Dashboard from "./Content/Dashboard";
import LibraryLoan from "./Content/LibraryLoan";
import Books from "./Content/Books";
import Members from "./Content/Members";
const Router = () => {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="recovery" element={<RecoveryPass />}></Route>
            <Route path="index" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="libraryloan" element={<LibraryLoan />}></Route>
              <Route path="books" element={<Books />}></Route>
              <Route path="members" element={<Members />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  );
};

export default Router;
