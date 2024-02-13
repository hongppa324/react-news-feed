import React from "react";
import { useNavigate } from "react-router-dom";
import { setPersistence, GoogleAuthProvider, signInWithPopup, browserLocalPersistence } from "firebase/auth";
import { authService } from "../firebase";

import { StyledButton } from "../styles/MyStyles";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/modules/UserInfo";


const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const provider = new GoogleAuthProvider();

  const loginTest = () => {
    setPersistence(authService, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(authService, provider)
          .then((result) => {
            const user = authService.currentUser;
            alert(user.displayName + "님, 돌아오신 것을 환영합니다.");
            navigate("/home", { replace: true });

            const newUser = { userId: user.uid, email: user.email, name: user.displayName };
            dispatch(addUser(newUser));
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
}

export default GoogleLogin;
