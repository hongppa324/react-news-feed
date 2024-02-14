import React from "react";
import { authService } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/modules/UserInfo";
import styled from "styled-components";

function SignOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UserInfo.userInfo);

  const signOutFunction = () => {
    const isSignOut = window.confirm("Sign out?");
    if (!isSignOut) return;

    signOut(authService).then(() => {
      dispatch(removeUser(userInfo.userId));
      navigate("/", { replace: true });
    });
  };

  return userInfo.length !== 0 ? <SignOutBtn onClick={signOutFunction}>Sign Out</SignOutBtn> : <></>;
}

export default SignOut;

const SignOutBtn = styled.button`
  border: none;
  width: 100%;
  background-color: black;
  color: #fff;
  height: 100%;
  font-size: 15px;
  transform: translateY(-20px);
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(0); /* Move the button back to its original position */
    height: 100%;
  }
`;
