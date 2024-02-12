import React, { useState } from "react";
import { authService } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

import { StyledForm, StyledSection, StyledInput, StyledSign, StyledSignIn, StyledSignUp } from "../styles/MyStyles";

const ResetFunc = () => {
  const [email, setEmail] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === "email") {
      setEmail(value);
    }
  };

  const reset = (event) => {
    event.preventDefault();
    sendPasswordResetEmail(authService, email)
      .then(() => {
        alert("이메일을 확인해주세요.");
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
      <StyledSign>
        <StyledSignUp to="/login">뒤로 가기</StyledSignUp>
        <StyledSignIn onClick={reset}>비밀번호 재설정</StyledSignIn>
      </StyledSign>
    </StyledForm>
  );
};

export default ResetFunc;
