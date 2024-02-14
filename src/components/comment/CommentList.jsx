import { collection, deleteDoc, doc, getDocs, query, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import styled from "styled-components";

export default function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = query(collection(db, `comments-${postId}`));
        const querySnapshot = await getDocs(q);

        const initialComments = [];

        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          initialComments.push({
            id: doc.id,
            content: doc.data().content,
            createdAt: doc.data().createdAt,
            writer: doc.data().writer,
            isEditing: doc.data().isEditing
          });
        });

        setComments(initialComments);
      } catch (error) {
        console.error("에러에요 : ", error);
      }
    };

    fetchComments();
  }, []);

  const onDeleteHandler = async (commentId) => {
    const answer = window.confirm("이 댓글을 삭제하시겠습니까?");

    if (answer) {
      try {
        await deleteDoc(doc(db, `comments-${postId}`, commentId));
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
        console.log("댓글이 성공적으로 삭제되었습니다:-)");
      } catch (error) {
        alert("댓글 삭제 오류가 발생했넴 .. ");
        console.error("댓글 삭제 중 오류가 발생했습니다:-(", error);
      }
    }
  };

  const handleEdit = (commentId) => {
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, isEditing: true };
        }
        return comment;
      })
    );
    setEditedContent(commentToEdit.content);
  };

  const handleInputChange = (e) => {
    setEditedContent(e.target.value);
    console.log(editedContent);
  };

  const handleCompleteEdit = async (commentId) => {
    try {
      await setDoc(doc(db, `comments-${postId}`, commentId), {
        //updateDoc -> setDoc 으로 바꿔보자
        content: editedContent
      });
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, isEditing: false, content: editedContent };
          }
          return comment;
        })
      );
      setEditedContent("");
    } catch (error) {
      alert("오류가 발생했네요..?ㅜㅡㅜ");
      console.error("댓글 수정 중 오류 발생", error);
    }
  };

  const substringAfter5 = (id) => {
    if (id === undefined || id.length <= 5) {
      return id;
    }
    const visiblePart = id.substring(0, 5);
    const hiddenPart = "*".repeat(id.length - 5);
    return visiblePart + hiddenPart;
  };

  return (
    <div>
      <div>
        <CommentsWrapper>
          <HorizontalRule />
          {comments.map((comment) => (
            <ListWrap key={comment.id} id={comment.id}>
              <ListIDandCreated>아이디 : {substringAfter5(comment.writer)}</ListIDandCreated>
              <ListIDandCreated>{comment.createdAt}</ListIDandCreated>
              {comment.isEditing ? (
                <>
                  <CommentContent value={editedContent} onChange={handleInputChange} />
                  <CommentDoneButton onClick={() => handleCompleteEdit(comment.id)}>완료</CommentDoneButton>
                </>
              ) : (
                <>
                  <p>{comment.content}</p>
                  <CommentEditButton onClick={() => handleEdit(comment.id)}>수정하기</CommentEditButton>
                  <CommentDeleteButton onClick={() => onDeleteHandler(comment.id)}>삭제하기</CommentDeleteButton>
                </>
              )}
              <HorizontalRule />
            </ListWrap>
          ))}
        </CommentsWrapper>
      </div>
      <br />
    </div>
  );
}

const CommentsWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: 30px;
`;

const ListWrap = styled.li`
  margin-bottom: 10px;
`;

const ListIDandCreated = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin-bottom: 5px;
`;

const CommentContent = styled.textarea`
  margin-bottom: 5px;
  font-size: 25px;
`;

const CommentDoneButton = styled.button`
  background-color: lightblue;
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  & button:hover {
    background-color: #1e6dff;
    transition: all 0.3s;
  }
`;

const CommentEditButton = styled.button`
  background-color: #fcd99a;
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ffb81e;
    transition: all 0.3s;
  }
`;

const CommentDeleteButton = styled.button`
  background-color: #fab3d7;
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f772b0;
    transition: all 0.3s;
  }
`;

const HorizontalRule = styled.hr`
  margin-right: 60px;
`;
