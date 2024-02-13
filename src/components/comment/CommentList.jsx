import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
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
      console.log("댓글 수정 성공!");
    } catch (error) {
      alert("오류가 발생했네..?ㅜㅡㅜ");
      console.error("댓글 수정 중 오류 발생", error);
    }
  };

  const hiddenId = (id) => {
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
          <hr />
          {comments.map((comment) => (
            <ListWrap id={comment.id} key={comment.id}>
              {/* <p>{comment.content}</p> */}
              <ListIDandCreated>아이디 : {hiddenId(comment.writer)}</ListIDandCreated>
              <ListIDandCreated>{comment.createdAt}</ListIDandCreated>
              {comment.isEditing ? (
                <>
                  <CommentContent value={editedContent} onChange={handleInputChange} />
                  <CommentButton onClick={() => handleCompleteEdit(comment.id)}>완료</CommentButton>
                </>
              ) : (
                <>
                  <p>{comment.content}</p>
                  <CommentButton onClick={() => handleEdit(comment.id)}>수정하기</CommentButton>
                  <CommentButton onClick={() => onDeleteHandler(comment.id)}>삭제하기</CommentButton>
                </>
              )}
              <hr />
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
  margin-bottom: 10px; /* 각 댓글 요소 사이에 여백 추가 */
`;

const ListIDandCreated = styled.p`
  display: flex;
  justify-content: space-between; /* 아이디와 생성일 사이를 좌우 정렬 */
  font-size: 15px;
  margin-bottom: 5px; /* 각 댓글 내부 요소 사이에 여백 추가 */
`;

const CommentContent = styled.p`
  margin-bottom: 5px; /* 댓글 내용 아래 여백 추가 */
  font-size: 20px;
`;

const CommentButton = styled.button`
  margin: 5px; /* 버튼 사이 여백 추가 */
`;
