import React from "react";
import { SignUpLink, Description } from "../styles/MyStyles";
import { useSelector } from "react-redux";

const MainRedir = () => {
  const userInfo = useSelector((state) => state.UserInfo.userInfo);

  return userInfo.length !== 0 ? (<></>
  ) : (
    <>
      <SignUpLink to="/login">지금 가입</SignUpLink>
      <Description>여러분, 지금 친구들과 만나보세요. 뭔지 아시죠?</Description>
    </>
  );
}

export default MainRedir;
