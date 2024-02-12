import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../firebase";
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";

import { StyledForm, StyledSection, StyledInput, StyledSign, StyledSignIn, StyledSignUp } from "../styles/MyStyles";

const EmailLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const signIn = (event) => {
    event.preventDefault();
    setPersistence(authService, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(authService, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            alert(user.displayName + "님, 돌아오신 것을 환영합니다.");
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

  return (
    <StyledForm>
      <StyledSection>
        <label>이메일 : </label>
        <StyledInput type="email" value={email} name="email" onChange={onChange} required></StyledInput>
      </StyledSection>
      <StyledSection>
        <label>비밀번호 : </label>
        <StyledInput type="password" value={password} name="password" onChange={onChange} required></StyledInput>
      </StyledSection>
      <StyledSign>
        <StyledSignIn onClick={signIn}>로그인</StyledSignIn>
        <StyledSignUp to="/sign-up">회원가입</StyledSignUp>
        <StyledSignUp to="/reset">비밀번호 재설정</StyledSignUp>
      </StyledSign>
    </StyledForm>
  );
};

export default EmailLogin;
