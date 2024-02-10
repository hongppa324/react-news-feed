import React from "react";
import Auth from "./components/crud/Auth";
import NewsFeed from "./components/crud/NewsFeed";
import { app, auth } from "./api/crudFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

function App() {
  //현재 로그인 된 유저 확인
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("현재 로그인 된 유저", user);
    });
  }, []);

  return (
    <>
      <h3>App</h3>
      <Auth />
      <NewsFeed />
    </>
  );
}

export default App;
