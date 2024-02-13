import React from "react";
import { Route, Routes } from "react-router-dom";
import FeedItem from "../components/crud/FeedItem";
import Main from "../routes/Main";
import LoginPage from "../routes/LoginPage";
import SignUpPage from "../routes/SignUpPage";
import Home from "../routes/Home";
import ResetPassword from "../routes/ResetPassword";
import FeedForm from "../components/crud/FeedForm";
import FeedDetail from "../components/crud/FeedDetail";
import MyPage from "../pages/MyPage";
import Comment from "../pages/Comment";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/comment/:id" element={<Comment />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/:id" element={<FeedDetail />} />
      <Route path="/feedWrite" element={<FeedForm />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/my-page" element={<MyPage />} />
    </Routes>
  );
}
export default Router;
