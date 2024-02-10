import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../../api/crudFirebase";
import { useNavigate } from "react-router-dom";

function FeedItem() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, title, content, date, isEdited } = state.editFeed;

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
    setNewContent(editContent);
  };

  return (
    <>
      ---------------------------------
      <br />
      <br />
      <br />
      <h1>상세페이지</h1>
      <div>제목 : {title}</div>
      <div> {date}</div>
      <div>
        <form onSubmit={onSubmit}>
          <textarea defaultValue={content} type="text" name="newContent" onChange={onChange} />
          <button>수정완료</button>
        </form>
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default FeedItem;
