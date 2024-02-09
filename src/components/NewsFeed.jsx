import React from "react";
import { useState } from "react";

function NewsFeed() {
  const [feed, setFeed] = useState([
    {
      id: 1,
      title: "제목입니다1",
      text: "안녕하세요",
      date: "2024-02-10",
      writer: "admin01"
    },
    { id: 2, title: "제목입니다2", text: "안녕하세요", date: "2024-02-10", writer: "admin02" }
  ]);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === "text") {
      setText(value);
    }
    if (name === "title") {
      setTitle(value);
    }
    console.log(title, text);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newFeed = {
      id: crypto.randomUUID(),
      title,
      text,
      date: "2024-02-10",
      writer: " "
    };
    setFeed([newFeed, ...feed]);
    e.target.reset();
    console.log(feed);
  };
  return (
    <>
      <div>NewsFeed</div>
      <div>
        {feed.map((e) => {
          return (
            <div key={e.id}>
              <div> {e.title}</div>
              <div> {e.text}</div>
              <div> {e.date}</div>
              <div> {e.writer}</div>
              <br />
            </div>
          );
        })}
      </div>

      <div>
        <form onSubmit={onSubmit}>
          <input type="text" onChange={onChange} value={title} name="title" />
          <br />
          <textarea type="text" onChange={onChange} value={text} name="text" />
          <button>작성하기</button>
        </form>
      </div>
    </>
  );
}

export default NewsFeed;
