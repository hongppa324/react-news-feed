import React from "react";
import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
=======
import FeedItem from "../components/crud/FeedItem";
>>>>>>> c19ce06065f0e92660eef6b3e362dc0a24dfff49
import Main from "../routes/Main";
import LoginPage from "../routes/LoginPage";
import SignUpPage from "../routes/SignUpPage";
import Home from "../routes/Home";
<<<<<<< HEAD
import ResetPassword from "../routes/ResetPassword";
=======
>>>>>>> c19ce06065f0e92660eef6b3e362dc0a24dfff49

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/feedItem" element={<FeedItem />} />
      <Route path="/home" element={<Home />} />
<<<<<<< HEAD
      <Route path="/reset" element={<ResetPassword />} />
=======
>>>>>>> c19ce06065f0e92660eef6b3e362dc0a24dfff49
    </Routes>
  );
}

export default Router;
