import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CommentList from "./CommentList";

export default function CommentItem({ postId }) {
  const [content, setContent] = useState("");
  // const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [editCommentId, setEditCommentId] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

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
      // setPassword("");
    } catch (error) {
      console.error("Error : ", error);
    }
  };
  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <CommentList postId={postId} />
        <br />
        <br />
        <p> Replies </p>
        <hr />
        <ul></ul>
        <br />
        <br />
        {/* Comment Form */}
        <form onSubmit={onSubmitHandler}>
          <input value={userId} readOnly />
          <br />
          <br />
          <textarea onChange={onTextHandler} value={content} placeholder="댓글을 작성해 주세요." required />
          {/* <input type="password" value={password} onChange={onPwdHandler} required /> */}
          <br />
          <button type="submit">ADD</button>
        </form>
      </div>
    </>
  );
}
