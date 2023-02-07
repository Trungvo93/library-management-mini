import React from "react";
import { BrowserRouter, Link, Route, Routes, NavLink } from "react-router-dom";
import Login from "./Login";
import RecoveryPass from "./RecoveryPass";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="recovery" element={<RecoveryPass />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
