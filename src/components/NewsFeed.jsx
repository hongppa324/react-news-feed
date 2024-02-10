import React from "react";
import { useState, useEffect } from "react";
import { collection, query, getDocs, doc, addDoc } from "firebase/firestore";
import { db } from "../api/crudFirebase";

function NewsFeed() {
  //컬렉션에 있는 값 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "newsFeed"));
      const querySnapshot = await getDocs(q);

      const initialFeeds = [];

      querySnapshot.forEach((doc) => {
        initialFeeds.push({ id: doc.id, ...doc.data() });
      });

      // firestore에서 가져온 데이터를 state에 전달
      setFeed(initialFeeds);
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
      date: "2024년 1월 29일"
    };
    setFeed([newFeed, ...feed]);

    const newsFeedRef = collection(db, "newsFeed");
    await addDoc(newsFeedRef, newFeed);

    e.target.reset();
  };

  //파일 업로드
  return (
    <>
      <div>NewsFeed</div>
      <div>
        {feed.map((e) => {
          return (
            <div>
              <div> {e.title}</div>
              <div> {e.content}</div>
              <div> {e.date}</div>
              <br />
            </div>
          );
        })}
      </div>

      <div>
        <form onSubmit={onSubmit}>
          <input type="text" onChange={onChange} value={title} name="title" />
          <br />
          <textarea type="text" onChange={onChange} value={content} name="content" />
          <button>작성하기</button>
        </form>
      </div>
    </>
  );
}

export default NewsFeed;
