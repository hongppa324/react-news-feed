import React from "react";
import { Route, Routes } from "react-router-dom";
import FeedItem from "../components/crud/FeedItem";
import Main from "../routes/Main";
import LoginPage from "../routes/LoginPage";
import SignUpPage from "../routes/SignUpPage";
import Home from "../routes/Home";
import Comment from "../pages/Comment";
import ResetPassword from "../routes/ResetPassword";
import CommentList from "../components/comment/CommentList";
import CommentItem from "../components/comment/CommentItem";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/feedItem" element={<FeedItem />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/comment/:id" element={<Comment />} />
      <Route path="/commentitem" element={<CommentItem />} />
      <Route path="/commentlist" element={<CommentList />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
export default Router;
