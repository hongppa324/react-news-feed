import { doc, setDoc } from "../../../api/firebase";
import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import MyInfo from "./MyInfo";
import { db } from "../../../api/firebase";

export default function MyProfile() {
  // 초기 data
  const validDataInit = {
    name: false,
    nickname: false
  };
  // 유효성 검증하는 함수
  const checkValidation = (...value) => {
    let result = { result: false, index: 0 };
    for (let i = 0; i < value.length; i++) {
      if (value[i].trim() === "") {
        result.result = true;
        result.index = i;
        break;
      }
    }
    return result;
  };

  // 로그인 -> 유저 정보, 로그인 여부 확인하는 로직
  // {userInfo, loginCheck} => 로그인/회원가입 component에서

  // CRUD ->  유저 정보 : ID, image 경로 / 유효성 관리하는 state
  const { userId, image_path } = userInfo;
  const [imageFile, setImageFile] = useState(image_path);
  const [validData, setValidData] = useState(validDataInit);

  // 유저 데이터
  // useMemo 훅 -> 속성 중 하나라도 변경되면 userData 다시 계산
  const userData = useMemo(
    () => ({
      userId: userInfo.shortid,
      name: userInfo.name,
      nickname: userInfo.nickcname,
      email: userInfo.email,
      image_path: userInfo.image_path
    }),
    [userInfo.shortid, userInfo.name, userInfo.nickcname, userInfo.email, userInfo.image_path]
  );

  // 정보 수정 상태 관리하는 state
  const [originalMyInfo, setOriginalMyInfo] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMyInfo, setEditedMyInfo] = useState(userData);

  // 회원정보 수정 버튼
  const editMyInfoHandler = () => {
    // 클릭 시 이전 값의 반대 상태로
    setIsEditing((prev) => !prev);
  };

  // MyInfo에서 text 가져오기
  const editTextHandler = (event, type) => {
    setEditedMyInfo((prev) => ({ ...prev, [type]: event.target.value }));
    setValidData({ ...validData, [type]: false });
  };

  // 수정 완료 버튼
  const editingIsDoneHandler = async () => {
    // 입력한 값 가져오기 : 이름, 닉네임
    const { name, nickname } = editedMyInfo;
    // 유효성 검사
    const validDataResult = checkValidation(name, nickname);
    // 빈값 체크
    if (validDataResult.result) {
      switch (validDataResult.index) {
        case 0:
          alert("이름을 입력해주세요.");
          setValidData({ ...validData, name: true });
          return;
        default:
          alert("닉네임을 입력해주세요.");
          setValidData({ ...validData, nickname: true });
          return;
      }
    }
    // 수정할 데이터가 없을 때
    if (name === userData.name && nickname === userData.nickname && imageFile === userData.image_path) {
      setIsEditing(false);
      return;
    }

    // 수정할 데이터가 있을 때
    const editData = {
      name,
      nickname,
      image_path: imageFile
    };
    // 서버에 데이터를 보낼 때까지 기다려!
    try {
      await setDoc(doc(db, "user_info", userId), {
        userId,
        ...editData
      });
      // 수정이 완료됐을 때
      setIsEditing(false);
      alert("수정이 완료되었습니다.");
    } catch (event) {
      console.error(event);
    }
  };

  useEffect(() => {
    setEditedMyInfo(userData);
    setOriginalMyInfo(userData);
    setImageFile(userData.image_path);
  }, [userData]);

  // useEffect(() => {
  //   loginCheck();
  // }, []);

  return (
    <>
      <MyProfileContainer>
        <Header>
          <NavLink to="/">Home</NavLink>
          <button>완료</button>
        </Header>
        <MyInfo
          imageFile={imageFile}
          setImageFile={setImageFile}
          isEditing={isEditing}
          editTextHandler={editTextHandler}
          editedMyInfo={editedMyInfo}
          validData={validData}
        />
        <ButtonContainer>
          {isEditing ? (
            <div>
              <EditingIsDoneButton onClick={editingIsDoneHandler}>수정 완료</EditingIsDoneButton>
              <EditMyInfoButton onClick={editMyInfoHandler}>수정 취소</EditMyInfoButton>
            </div>
          ) : (
            <div>
              <EditMyInfoButton onClick={editMyInfoHandler}>회원 정보 수정</EditMyInfoButton>
            </div>
          )}
        </ButtonContainer>
      </MyProfileContainer>
    </>
  );
}

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const MyProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const EditingIsDoneButton = styled.button``;
const EditMyInfoButton = styled.button``;
