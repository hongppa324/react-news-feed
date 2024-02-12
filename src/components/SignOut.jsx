import React from "react";
import { authService } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();

  const signOutFunction = () => {
    const isSignOut = window.confirm("Sign out?");
    if (!isSignOut) return;

    signOut(authService).then(() => {
      navigate("/", { replace: true });
    });
  };

  return authService.currentUser ? <button onClick={signOutFunction}>Sign Out</button> : <></>;
}

export default SignOut;
