import React from "react";
import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom";
import Login from "./Login";
import Layout from "./Layout";
import RecoveryPass from "./RecoveryPass";
import { Provider } from "react-redux";
import { store } from "../redux/store";
const Router = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="recovery" element={<RecoveryPass />}></Route>
          <Route path="index" element={<Layout />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
