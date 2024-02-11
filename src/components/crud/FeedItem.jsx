import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db, auth, storage } from "../../api/crudFirebase";
import { useNavigate } from "react-router-dom";

function FeedItem() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, title, content, date, isEdited, writer, img } = state.editFeed;

  const [newContent, setNewContent] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const editFeedRef = doc(db, "newsFeed", id);

    await updateDoc(editFeedRef, {
      ...state.editFeed,
      content: newContent,

      date: Timestamp.fromDate(new Date()),
      isEdited: !state.editFeed.isEdited
    });
    navigate("/feed");
  };
  const onChange = (e) => {
    const editContent = e.target.value;

    if (!editContent) {
      alert("내용을 입력해주세요");
      return;
    }
    setNewContent(editContent);
  };

  ///사진 삭제 구현 수정중....
  const deleteImg = async () => {
    alert("사진이 삭제됐습니다. 마저 수정을 완료해주세요");
    try {
      const desertRef = ref(storage, `${auth.currentUser.uid}/${img}`);

      await deleteObject(desertRef);
      console.lg("url=>", desertRef);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(" errorCode=>", errorCode);
      console.log(" errorMessage=>", errorMessage);
    }
  };
  return (
    <>
      ---------------------------------
      <br />
      <br />
      <br />
      <h1>상세페이지</h1>
      <div>작성자 :{writer}</div>
      <div>제목 : {title}</div>
      <div> {date}</div>
      <div>
        <img src={img} style={{ width: "200px", height: "200px" }} />
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <textarea defaultValue={content} type="text" name="newContent" onChange={onChange} />

          <button>수정완료</button>
        </form>
        <br />
        <button onClick={deleteImg}>사진삭제</button>
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default FeedItem;
