import React from "react";
import { authService } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/modules/UserInfo";

function SignOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UserInfo.userInfo);

  const signOutFunction = () => {
    const isSignOut = window.confirm("Sign out?");
    if (!isSignOut) return;

    signOut(authService).then(() => {
      dispatch(removeUser(userInfo.userId))
      navigate("/", { replace: true });
    });
  };

  return userInfo.length !== 0 ? <button onClick={signOutFunction}>Sign Out</button> : <></>;
}

export default SignOut;
