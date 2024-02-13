import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { db } from "../../../firebase";
import MyPosts from "./MyPosts";

export default function MyProfile({ userId }) {
  console.log(userId);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    intro: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileDoc = await doc(db, "profiles", userId).get();
        // if (profileDoc.exists()) {
        //   setProfile(profileDoc.data());
        // } else {
        //   console.error("프로필을 찾을 수 없습니다.");
        // }
      } catch (error) {
        console.error("프로필을 불러오는 중 오류가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, [userId]);

  // 회원정보 수정 버튼
  const editMyInfoHandler = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // 수정 내용 저장 버튼
  const submitMyInfoHandler = async (event) => {
    event.preventDefault();
    try {
      const updatedProfile = doc(db, "profiles", userId);
      await updateDoc(updatedProfile, { ...profile });
      console.log("프로필이 업데이트되었습니다.");

      const updatedProfileDoc = await doc(db, "profiles", userId).get();
      if (updatedProfileDoc.exists()) {
        setProfile(updatedProfileDoc.data());
      }
    } catch (error) {
      console.error("프로필을 업데이트하는 과정에서 오류가 발생했습니다.", error);
    }
  };

  return (
    <>
      <MyProfileContainer>
        <Header>
          <NavLink to="/home">Home</NavLink>
          <h1>My Profile</h1>
        </Header>

        <FormContainer>
          <form onSubmit={submitMyInfoHandler}>
            <label>
              이름 : <input type="text" name="name" value={profile.name} onChange={editMyInfoHandler} />
            </label>
            <label>
              이메일 :
              <input type="email" name="email" value={profile.email} onChange={editMyInfoHandler} />
            </label>
            <label>
              소개 :
              <textarea name="intro" value={profile.intro} onChange={editMyInfoHandler} />
            </label>
            <button type="submit">저장</button>
          </form>
        </FormContainer>
        <MyPosts userId={userId} />
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

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
