import React, { useEffect } from "react";
import { app } from "./firebase";

const App = () => {
  useEffect(() => {
    console.log("app", app);
  }, []);

  return <h3>App</h3>;
};

export default App;
