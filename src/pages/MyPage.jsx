import React, { useState, useRef } from "react";
import { authService } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNickName } from "../redux/modules/MyProfile";

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const nickName = useSelector((state) => state.MyProfile.nickName); // 리덕스 상태에서 닉네임 가져오기

  const currentUser = authService.currentUser;
  const [localNickName, setLocalNickName] = useState(currentUser?.displayName || "");

  const onChangeNickName = (event) => {
    setLocalNickName(event.target.value); // 로컬 상태 업데이트
  };

  const onChangeNickNameBtn = () => {
    if (inputRef.current) {
      inputRef.current.style.display = "block";
      setLocalNickName(currentUser?.displayName || "");
      inputRef.current.focus();
    }
  };

  const handleChangeNickNameBtn = async () => {
    if (!localNickName) {
      alert("닉네임을 입력하세요.");
      return;
    }

    try {
      await updateProfile(authService.currentUser, {
        displayName: localNickName
      });
      alert("닉네임 변경완료");
      dispatch(setNickName({ nickName: localNickName })); // 리덕스 상태 업데이트
      navigate("/my-page", { replace: true });
    } catch (error) {
      console.error(error);
      alert("닉네임 변경에 실패했습니다.");
    }
  };

  return (
    <>
      <div>{authService.currentUser ? <h1>{authService.currentUser.displayName}님의 마이페이지</h1> : ""}</div>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="text"
        value={localNickName}
        onChange={onChangeNickName}
        placeholder="변경할 닉네임을 입력해주세요."
      />
      <button onClick={onChangeNickNameBtn}>닉네임 변경</button>
      <button onClick={handleChangeNickNameBtn}>변경</button> {/* 변경 버튼 추가 */}
      <div>{/* ProfileImage 컴포넌트 */}</div>
    </>
  );
};

export default MyPage;

// import React, { useState, useRef } from "react";
// import { authService } from "../firebase";
// import { updateProfile } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// // import styled from "styled-components";

// const MyPage = () => {
//   const navigate = useNavigate();
//   const inputRef = useRef(null);

//   const currentUser = authService.currentUser;
//   const [nickName, setNickName] = useState(currentUser?.displayName || "");

//   const onChangeNickName = (event) => {
//     setNickName(event.target.value);
//   };

//   const onChangeNickNameBtn = () => {
//     if (inputRef.current) {
//       inputRef.current.style.display = "block";
//       setNickName(currentUser?.displayName || "");
//       inputRef.current.focus();
//     }
//   };

//   const handleChangeNickNameBtn = async () => {
//     if (!nickName) {
//       alert("닉네임을 입력하세요.");
//       return;
//     }

//     try {
//       await updateProfile(authService.currentUser, {
//         displayName: nickName
//       });
//       alert("닉네임 변경완료");
//       navigate("/my-page", { replace: true });
//     } catch (error) {
//       console.error(error);
//       alert("닉네임 변경에 실패했습니다.");
//     }
//   };

//   return (
//     <>
//       <div>{authService.currentUser ? <h1>{authService.currentUser.displayName}님의 마이페이지</h1> : ""}</div>
//       <input
//         style={{ display: "none" }}
//         ref={inputRef}
//         type="text"
//         value={nickName}
//         onChange={onChangeNickName}
//         placeholder="변경할 닉네임을 입력해주세요."
//       />
//       <button onClick={onChangeNickNameBtn}>닉네임 변경</button>
//       <button onClick={handleChangeNickNameBtn}>변경</button> {/* 변경 버튼 추가 */}
//       <div>{/* ProfileImage 컴포넌트 */}</div>
//     </>
//   );
// };

// export default MyPage;
