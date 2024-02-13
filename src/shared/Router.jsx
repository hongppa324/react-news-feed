import React from "react";
import { Route, Routes } from "react-router-dom";
import FeedItem from "../components/crud/FeedItem";
import Main from "../routes/Main";
import LoginPage from "../routes/LoginPage";
import SignUpPage from "../routes/SignUpPage";
import Home from "../routes/Home";
import Comment from "../pages/Comment";
import FeedForm from "../components/crud/FeedForm";
function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/feedItem" element={<FeedItem />} />
      <Route path="/comment" element={<Comment />} />
      <Route path="/home" element={<Home />} />
      <Route path="/feedWrite" element={<FeedForm />} />
    </Routes>
  );
}
export default Router;
