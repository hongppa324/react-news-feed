import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../routes/Main";
import LoginPage from "../routes/LoginPage";
import SignUpPage from "../routes/SignUpPage";
import Home from "../routes/Home";
import ResetPassword from "../routes/ResetPassword";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/reset" element={<ResetPassword />} />
    </Routes>
  );
}

export default Router;
