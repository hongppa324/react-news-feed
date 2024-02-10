import React from "react";
import { Route, Routes } from "react-router-dom";
import NewsFeed from "../pages/NewsFeed";
import FeedItem from "../components/crud/FeedItem";

function Router() {
  return (
    <Routes>
      <Route path="/feed" element={<NewsFeed />} />
      <Route path="/feedItem" element={<FeedItem />} />
    </Routes>
  );
}

export default Router;
