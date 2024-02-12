import React from "react";
import { useEffect, useState } from "react";
import { app, auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Crud() {
  const navigate = useNavigate();
  //firebase 계정
  // useEffect(() => {
  //   console.log("app", app);
  // }, []);

  //회원가입
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [click, setClick] = useState(false);
  const onChange = (e) => {
    const {
      target: { name, value }
    } = e;
    if (name == "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const signUp = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user", userCredential.user);
      alert("회원가입 완료");
      setEmail("");
      setPassword("");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      //   console.log("erroCode,", errorCode);
      console.log("오류메시지", errorMessage);
    }
  };

  //로그인
  const signIn = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.email;
      alert(`${userId}님 안녕하세요`);
      setEmail("");
      setPassword("");
      setClick(true);
      //   console.log(`uer`, userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("오류메시지,", errorMessage);
    }
    navigate("/feed");
  };

  //로그아웃
  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
    setClick(false);
    navigate("/");
  };
  return (
    <>
      <div>
        로그인 : <input type="email" value={email} name="email" onChange={onChange} required />
        <br />
        비밀번호 : <input type="password" value={password} name="password" onChange={onChange} required />
        <br />
        {!click ? <button onClick={signUp}>회원가입</button> : ""}
        {!click ? <button onClick={signIn}>로그인</button> : <button onClick={logOut}>로그아웃</button>}
        {!click ? "" : <button>글쓰기</button>}
        <br />
      </div>
    </>
  );
}

export default Crud;
