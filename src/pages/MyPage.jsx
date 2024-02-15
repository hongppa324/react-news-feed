import React, { useState, useRef, useEffect } from "react";
import { authService, db, storage } from "../firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNickName } from "../redux/modules/MyProfile";
import styled from "styled-components";
import MyPosts from "../components/mypage/MyPosts";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const nickName = useSelector((state) => state.MyProfile.nickName);
  const currentUser = authService.currentUser;
  const userInfo = useSelector((state) => state.UserInfo.userInfo);
  const [myNickName, setMyNickName] = useState(currentUser?.displayName || "");
  const [myPosts, setMyPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userDoc = await doc(db, "users", userInfo.uid);
        const userSnapshot = await getDocs(userDoc);
        const userData = userSnapshot.data();
        if (userData.profileImage) {
          setProfileImage(userData.profileImage);
        }
      } catch (error) {
        console.error("사용자 정보를 불러오는 데 실패했습니다:", error);
      }
    };
    fetchUserInfo();
  }, [userInfo]);

  const onChangeNickName = (event) => {
    setMyNickName(event.target.value);
  };

  const handleChangeNickNameBtn = async () => {
    if (!myNickName) {
      alert("닉네임을 입력하세요.");
      return;
    }

    try {
      await updateProfile(authService.currentUser, {
        displayName: myNickName
      });
      alert("닉네임 변경완료");
      dispatch(setNickName({ nickName: myNickName }));
      navigate("/my-page", { replace: true });
    } catch (error) {
      console.error(error);
      alert("닉네임 변경에 실패했습니다.");
    }
  };

  const uploadProfileImage = async () => {
    if (!selectedFile) {
      alert("파일을 선택하세요.");
      return;
    }
    const imageRef = ref(storage, `${userInfo.email}/profileImage/${selectedFile.name}`);

    try {
      await uploadBytes(imageRef, selectedFile);
      const downloadURL = await getDownloadURL(imageRef);

      const userDocRef = doc(db, "users", userInfo.uid);
      await updateDoc(userDocRef, {
        profileImage: downloadURL
      });

      alert("프로필 사진이 업로드되었습니다.");
    } catch (error) {
      console.error("프로필 사진 업로드 에러:", error);
      alert("프로필 사진 업로드에 실패했습니다.");
    }
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files?.[0]);
  };

  return (
    <>
      <MyInfoWrapper>
        {authService.currentUser ? (
          <>
            <Title>{authService.currentUser.displayName}님의 마이페이지</Title>
            <Intro>{userInfo.intro}</Intro>
            {profileImage && <ProfileImage src={profileImage} alt="프로필 사진" />}
          </>
        ) : (
          ""
        )}
        <NickNameWindow>
          <label>닉네임 : </label>
          <input
            ref={inputRef}
            type="text"
            value={myNickName}
            onChange={onChangeNickName}
            placeholder="변경할 닉네임을 입력해주세요."
          />
          <button onClick={handleChangeNickNameBtn}>변경 완료</button>
        </NickNameWindow>
        <ProfileImageUpload>
          <label>프로필 사진 업로드: </label>
          <input type="file" onChange={handleFileSelect} />
          <button onClick={uploadProfileImage}>업로드</button>
        </ProfileImageUpload>
      </MyInfoWrapper>
      <MyPostsWrapper>
        <MyPosts userId={authService.currentUser?.uid} myPosts={myPosts} />
      </MyPostsWrapper>
    </>
  );
};

export default MyPage;

const MyInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;
const Title = styled.h1`
  font-size: 30px;
`;
const Intro = styled.p``;

const NickNameWindow = styled.div`
  width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  gap: 5px;
  & label {
  }
  & input {
    width: 400px;
  }
`;

const ProfileImageUpload = styled.div`
  width: 600px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  gap: 5px;
  & label {
  }
`;

const MyPostsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 20px;
`;
