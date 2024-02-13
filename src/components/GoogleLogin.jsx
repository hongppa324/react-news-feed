import React from "react";
import { useNavigate } from "react-router-dom";
import { setPersistence, GoogleAuthProvider, signInWithPopup, browserSessionPersistence } from "firebase/auth";
import { authService } from "../firebase";

import { StyledButton } from "../styles/MyStyles";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const loginTest = () => {
    setPersistence(authService, browserSessionPersistence)
      .then(() => {
        return signInWithPopup(authService, provider)
          .then((result) => {
            alert(authService.currentUser.displayName + "님, 돌아오신 것을 환영합니다.");
            navigate("/home", { replace: true });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return <StyledButton onClick={loginTest}>Google로 로그인</StyledButton>;
};

export default GoogleLogin;
