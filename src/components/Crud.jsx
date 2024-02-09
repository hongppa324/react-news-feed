import React from "react";
import { useEffect } from "react";
import { app } from "../api/crudFirebase";

function Crud() {
  useEffect(() => {
    console.log("app", app);
  }, []);

  return (
    <>
      <h1>crud</h1>
    </>
  );
}

export default Crud;
