import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "../firebase";

import { StyledButton } from "../styles/MyStyles";

function GoogleLogin() {
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const loginTest = () => {
    signInWithPopup(authService, provider)
      .then((result) => {
        navigate("/home", { replace: true });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return <StyledButton onClick={loginTest}>Google로 로그인</StyledButton>;
}

export default GoogleLogin;
