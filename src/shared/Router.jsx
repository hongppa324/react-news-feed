import React from "react";
import { Route, Routes } from "react-router-dom";
import NewsFeed from "../pages/NewsFeed";
import Comment from "../pages/Comment";

function Router() {
  return (
    <Routes>
      <Route path="/comment" element={<Comment />} />
      {/* <Route path="/feedItem" element={<FeedItem />} /> */}
    </Routes>
  );
}

export default Router;
