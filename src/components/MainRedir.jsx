import React from "react";
import { SignUpLink, Description } from "../styles/MyStyles";
import { useNavigate } from "react-router-dom";
import { authService } from "../firebase";

const MainRedir = () => {
  const navigate = useNavigate();

  return authService.currentUser ? (
    navigate("/home", { replace: true })
  ) : (
    <>
      <SignUpLink to="/login">지금 가입</SignUpLink>
      <Description>여러분, 지금 친구들과 만나보세요. 뭔지 아시죠?</Description>
    </>
  );
}

export default MainRedir;
