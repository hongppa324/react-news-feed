import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";

export default function CommentList() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

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

  const onDeleteBtn = async (commentId) => {
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

  return (
    <div>
      <div>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
              <p>{comment.createdAt}</p>
              {/* <button>수정</button> */}
              <button>수정</button>
              <button onClick={() => onDeleteBtn(comment.id)}>삭제</button>
              {/* 다른 필드들도 필요에 따라 표시 */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
