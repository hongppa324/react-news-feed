import React from "react";
import { Route, Routes } from "react-router-dom";
import FeedItem from "../components/crud/FeedItem";
import Main from "../routes/Main";
import LoginPage from "../routes/LoginPage";
import SignUpPage from "../routes/SignUpPage";
import Home from "../routes/Home";
import Comment from "../pages/Comment";
import FeedForm from "../components/crud/FeedForm";
import FeedDetail from "../components/crud/FeedDetail";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/:id" element={<FeedDetail />} />
      <Route path="/feedWrite" element={<FeedForm />} />
      <Route path="/comment" element={<Comment />} />
      {/* <Route path="/feedItem" element={<FeedItem />} /> */}
    </Routes>
  );
}
export default Router;
