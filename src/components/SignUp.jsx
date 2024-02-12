import React from "react";
import { useState } from "react";
import { app, authService } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { StyledForm, StyledSection, StyledInput, StyledButton } from "../styles/MyStyles";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === "userName") {
      setUserName(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };
  const signUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        updateProfile(authService.currentUser, { displayName: userName })
          .then(() => {
            alert(authService.currentUser.displayName + "님의 회원가입을 환영합니다.");
            navigate("/login", { replace: true });
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
        <label>이름 : </label>
        <StyledInput type="text" value={userName} name="userName" onChange={onChange} required></StyledInput>
      </StyledSection>
      <StyledSection>
        <label>이메일 : </label>
        <StyledInput type="email" value={email} name="email" onChange={onChange} required></StyledInput>
      </StyledSection>
      <StyledSection>
        <label>비밀번호 : </label>
        <StyledInput type="password" value={password} name="password" onChange={onChange} required></StyledInput>
      </StyledSection>
      <StyledSign>
        <StyledSignUp to="/login">뒤로 가기</StyledSignUp>
        <StyledSignIn onClick={signUp}>회원가입</StyledSignIn>
      </StyledSign>
    </StyledForm>
  );
}

export default SignUp;
