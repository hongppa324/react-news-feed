import React from "react";
import { useState, useEffect } from "react";
import { collection, query, getDocs, doc, addDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "../api/crudFirebase";
import { useNavigate } from "react-router-dom";

function NewsFeed() {
  const navigate = useNavigate();
  // 컬렉션에 있는 값 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "newsFeed"));
      const querySnapshot = await getDocs(q);

      const initialFeeds = [];

      querySnapshot.forEach((doc) => {
        initialFeeds.push({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          isEdited: doc.data().isEdited,
          date: doc.data().date.toDate().toLocaleString()
        });

        // firestore에서 가져온 데이터를 state에 전달

        setFeed(initialFeeds);
      });
    };

    fetchData();
  }, []);

  const [feed, setFeed] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === "content") {
      setContent(value);
    }
    if (name === "title") {
      setTitle(value);
    }
    // console.log(title, content);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const newFeed = {
      title,
      content,
      date: new Date().toLocaleString()
    };
    setFeed([newFeed, ...feed]);

    const newsFeedRef = collection(db, "newsFeed");
    await addDoc(newsFeedRef, { ...newFeed, date: Timestamp.fromDate(new Date()) });

    e.target.reset();
  };

  const deleteHandler = async (selectFeed) => {
    const deleteFeed = feed.filter((allFeed) => {
      return allFeed.id !== selectFeed;
    });
    setFeed(deleteFeed);
    const newsFeedRef = doc(db, "newsFeed", selectFeed);
    await deleteDoc(newsFeedRef);
  };

  const editHandler = (selectFeed) => {
    const editFeed = feed.find((allFeed) => {
      return allFeed.id === selectFeed;
    });

    navigate("/feedItem", { state: { editFeed } });
  };
  //파일 업로드
  return (
    <>
      <div>
        {feed.map((e) => {
          return (
            <div key={e.id}>
              <div> {e.title}</div>
              <div> {e.content}</div>
              <div>{e.date}</div>
              <div>{!e.isEdited ? "" : "(수정됨)"}</div>
              <button onClick={() => editHandler(e.id)}>수정하기</button>
              <button onClick={() => deleteHandler(e.id)}>삭제하기</button>
              <br />
              <br />
              <br />
              <br />
            </div>
          );
        })}
      </div>

      <div>
        <form onSubmit={onSubmit}>
          제목 : <input type="text" onChange={onChange} value={title} name="title" />
          <br />
          내용 : <textarea type="text" onChange={onChange} value={content} name="content" />
          <br />
          <button>작성하기</button>
        </form>
      </div>
    </>
  );
}

export default NewsFeed;
