//feedItem

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { doc, updateDoc, Timestamp, collection, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db, auth, storage } from "../firebase";
import { useNavigate } from "react-router-dom";

function FeedItem() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, title, content, date, isEdited, writer, img } = state.editFeed;

  const [newContent, setNewContent] = useState(content);

  const [modify, setModify] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "newsFeed"), where("id", "==", id));
      const querySnapshot = await getDocs(q);

      const modifyFeed = [];

      querySnapshot.forEach((doc) => {
        modifyFeed.push({ id: doc.id, img: doc.data().img, ...doc.data() });
      });

      setModify(modifyFeed);
    };
    fetchData();
  }, [img]);

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
    try {
      const desertRef = ref(storage, img);
      await deleteObject(desertRef);
      alert("사진이 삭제됐습니다. 마저 수정을 완료해주세요");
    } catch (error) {
      console.log("사진 errorCode=>", error.errorCode);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (newContent === content) {
      alert("수정값이 없습니다.");
      return;
    }

    const editFeedRef = doc(db, "newsFeed", id);
    await updateDoc(editFeedRef, {
      ...state.editFeed,
      content: newContent,
      date: Timestamp.fromDate(new Date()),
      isEdited: !state.editFeed.isEdited
    });
    navigate("/home");
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
