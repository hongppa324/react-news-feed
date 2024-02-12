import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../api/firebase";
// import CommentItem from "./CommentItem";

export default function CommentList() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = query(collection(db, "comments"));
        const querySnapshot = await getDocs(q);

        const initialComments = [];

        querySnapshot.forEach((doc) => {
          initialComments.push({
            id: doc.id,
            content: doc.data().content,
            createdAt: doc.data().createdAt,
            isEditing: doc.data().isEditing,
            password: doc.data().password
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
        await deleteDoc(doc(db, "comments", commentId));
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
        console.log("댓글이 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("댓글 삭제 중 오류가 발생했습니다:", error);
      }
    }
  };

  const handleEdit = (commentId) => {
    const commentToEdit = comments.find((comment) => comment.id === commentId);
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, isEditing: true }; // 수정 모드 활성화
        }
        return comment;
      })
    );
    setEditedContent(commentToEdit.content); // 수정할 내용 설정
  };

  const handleInputChange = (e) => {
    setEditedContent(e.target.value); // 수정된 내용 업데이트
  };

  const handleCompleteEdit = async (commentId) => {
    try {
      // 수정이 완료되면 수정된 내용을 파이어베이스에 업데이트합니다.
      await updateDoc(doc(db, "comments", commentId), {
        //updateDoc -> setDoc 으로 바꿔보자
        content: editedContent
      });
      // 수정 모드를 비활성화합니다.
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, isEditing: false }; // 수정 모드 비활성화
          }
          return comment;
        })
      );
      console.log("댓글 수정 성공!");
    } catch (error) {
      console.error("댓글 수정 중 오류 발생", error);
    }
  };

  return (
    <div>
      <div>
        <h2>Comments!CommentList쪽</h2>

        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <p>{comment.createdAt}</p>
              {comment.isEditing ? (
                <>
                  <textarea value={editedContent} onChange={handleInputChange} />
                  <button onClick={() => handleCompleteEdit(comment.id)}>완료</button>
                </>
              ) : (
                <>
                  <p>{comment.content}</p>
                  <button onClick={() => handleEdit(comment.id)}>수정</button>
                  <button onClick={() => onDeleteHandler(comment.id)}>삭제</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
