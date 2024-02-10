import React from "react";
import { useState, useEffect } from "react";
import { collection, query, getDocs, doc, addDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { db, auth, storage } from "../api/crudFirebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";

function NewsFeed() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log("현재 로그인 된 유저", user);
    });
  }, []);

  const user = auth.currentUser;
  // console.log("사용자", user);
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
          date: doc.data().date.toDate().toLocaleString(),
          writer: doc.data().writer,
          img: doc.data().img
        });

        setFeed(initialFeeds);
      });
    };

    fetchData();
  }, []);

  //state
  const [feed, setFeed] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
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

  //글 추가하기
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("빈곳없이 다 작성해주세요!");
      return;
    }

    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);
    const downloadURL = await getDownloadURL(imageRef);

    const newFeed = {
      title,
      content,
      date: new Date().toLocaleString(),
      isEdited: false,
      writer: user.email,
      img: downloadURL
    };
    setFeed([newFeed, ...feed]);

    const newsFeedRef = collection(db, "newsFeed");
    await addDoc(newsFeedRef, { ...newFeed, date: Timestamp.fromDate(new Date()) });

    console.log(downloadURL);
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  //삭제 & 수정
  const deleteHandler = async (selectFeed) => {
    const deleteFeed = feed.filter((allFeed) => {
      return allFeed.id !== selectFeed;
    });
    setFeed(deleteFeed);
    const newsFeedRef = doc(db, "newsFeed", selectFeed);
    await deleteDoc(newsFeedRef);
  };

  const editHandler = (selectFeed) => {
    alert("글 내용만 수정 가능합니다.");
    const editFeed = feed.find((allFeed) => {
      return allFeed.id === selectFeed;
    });

    navigate("/feedItem", { state: { editFeed } });
  };
  //파일 업로드
  return (
    <>
      <br />
      <br />
      <br />
      <br />

      <div>
        {feed.map((e) => {
          return (
            <div key={e.id} style={{ border: "1px solid blue" }}>
              <div> 제목 : {e.title}</div>
              <div> 내용 : {e.content}</div>
              <div>사진 </div>
              <div>{e.date}</div>
              <div>{!e.isEdited ? "" : "(수정됨)"}</div>
              <div>작성자 : {e.writer}</div>
              <div>
                <img src={e.img} style={{ width: "200px", height: "200px" }} alt="사진이없어용" />
              </div>
              {e.writer !== user.email ? "" : <button onClick={() => editHandler(e.id)}>수정하기</button>}
              {e.writer !== user.email ? "" : <button onClick={() => deleteHandler(e.id)}>삭제하기</button>}

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
          <input type="file" onChange={handleFileSelect} />
          <button>작성하기</button>
        </form>
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default NewsFeed;
