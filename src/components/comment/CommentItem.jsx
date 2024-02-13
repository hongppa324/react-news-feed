import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CommentList from "./CommentList";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function CommentItem({ postId }) {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [editCommentId, setEditCommentId] = useState("");

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(""); // 사용자가 로그아웃한 경우 초기화
      }
    });
    return () => unsubscribe();
  }, []);

  const onTextHandler = (e) => {
    setContent(e.currentTarget.value);
  };

  // const onPwdHandler = (e) => {
  //   setPassword(e.target.value);
  // };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const newComment = {
      id: crypto.randomUUID(),
      content: content,
      createdAt: new Date().toLocaleDateString(),
      writer: userId,
      isEditing: false
      // password,
    };

    try {
      const docRef = await addDoc(collection(db, `comments-${postId}`), newComment);
      setEditCommentId(docRef.id);
      console.log("이 comment의 아이디는 : ", docRef.id);

      setContent("");
      // 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const homeBtn = () => {
    navigate("/home");
  };

  return (
    <>
      <div>
        <br />
        <HomeBtn onClick={homeBtn}>홈으로</HomeBtn>
        <br />
        <br />
        <FormHead> Replies </FormHead>
        <hr />
        <br />
        {/* Comment Form */}
        <FormWrap onSubmit={onSubmitHandler}>
          <Formtitle>
            <UserIdForm value={userId} readOnly />
            님! 댓글을 남겨주세요
          </Formtitle>
          <br />
          <br />
          <InputComment onChange={onTextHandler} value={content} placeholder="댓글을 작성해 주세요." required />
          {/* <input type="password" value={password} onChange={onPwdHandler} required /> */}
          <br />
          <AddBtn>
            <button type="submit">ADD</button>
          </AddBtn>
        </FormWrap>
        <br />
        <br />
        <CommentList postId={postId} />
        <br />
        <br />
      </div>
    </>
  );
}

const HomeBtn = styled.button`
  background-color: black;
  color: white;
  margin: 25px 25px 25px 35px;
  padding: 13px;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: #f74562;
    transition: all 0.3s;
  }
`;

const FormHead = styled.p`
  margin-left: 60px;
  font-size: 2.7rem;
  color: #333;
`;

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
  justify-content: center;
  width: 1200px; /* 폼 너비 지정 */
  margin: 0 auto; /* 가운데 정렬 */
`;

const UserIdForm = styled.input`
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  margin-right: auto; /* 우측 여백 자동으로 마진 설정 */
`;

const Formtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 10px; /* 아래 여백 추가 */
  color: #333;
`;

const InputComment = styled.textarea`
  display: flex;
  align-items: center;
  justify-content: center;
  resize: none;
  padding: 15px;
  font-size: 15px;
  height: 130px;
  width: 100%;
  background-color: #f5fcfd;
  border-radius: 5px;
  border: 2px solid gray;
`;

const AddBtn = styled.span`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  width: 100%; /* 버튼을 폼 너비에 맞게 설정 */
  & button {
    background-color: lightblue;
    color: white;
    padding: 0.7rem 1.2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  & button:hover {
    background-color: #1e6dff;
    transition: all 0.3s;
  }
`;
