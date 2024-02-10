import React from "react";
import { Route, Routes } from "react-router-dom";
import NewsFeed from "../pages/NewsFeed";

function Router() {
  return (
    <Routes>
      <Route path="/feed" element={<NewsFeed />} />
    </Routes>
  );
}

export default Router;
