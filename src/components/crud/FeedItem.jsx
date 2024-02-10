import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function FeedItem() {
  const { state } = useLocation();
  const { id, title, content } = state.editFeed;

  const [newContent, setNewContent] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    // const editFeedRef = doc(db, "newsFeed", id);
    //  await updateDoc(editFeedRef, { ...state.editFeed, content: newContent });
  };
  const onChange = (e) => {
    const editContent = e.target.value;
    setNewContent(editContent);
  };

  return (
    <>
      <h1>상세페이지</h1>
      <div>제목 : {title}</div>
      <div>내용 : {content}</div>
      <div>
        <form onSubmit={onSubmit}>
          <textarea defaultValue={content} type="text" name="newContent" onChange={onChange} />
          <button>수정완료</button>
        </form>
      </div>
    </>
  );
}

export default FeedItem;
