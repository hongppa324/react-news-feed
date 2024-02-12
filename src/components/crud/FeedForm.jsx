import React from "react";
import { useState, useEffect } from "react";
import { collection, query, doc, addDoc, deleteDoc, Timestamp, orderBy, onSnapshot } from "firebase/firestore";
import { db, authService, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";

function FeedForm() {
  const [feed, setFeed] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      console.log("현재 로그인 된 유저", user);
    });
  }, []);

  //현재 사용자 불러오기
  const userId = authService.currentUser;
  const user = authService.currentUser.displayName;
  console.log("user", user);

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
  };

  //글 추가하기
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("빈곳없이 다 작성해주세요!");
      return;
    }

    const uploadFeed = async (img) => {
      // 공통 작업을 수행합니다.
      setFeed([img, ...feed]);
      const newsFeedRef = collection(db, "newsFeed");
      await addDoc(newsFeedRef, { ...img, date: Timestamp.fromDate(new Date()) });
      setSelectedFile(null);
    };

    if (!selectedFile) {
      const defaultRef = ref(storage, `/defaultImg/background.png`);
      const defaultImgdURL = await getDownloadURL(defaultRef);
      const newFeed = {
        id: crypto.randomUUID(),
        title,
        content,
        date: new Date().toLocaleString(),
        isEdited: false,
        writer: user,
        img: defaultImgdURL
      };
      await uploadFeed(newFeed);
    } else {
      // 파일 업로드
      const imageRef = ref(storage, `${authService.currentUser.email}/${selectedFile.name}`);
      await uploadBytes(imageRef, selectedFile);
      const downloadURL = await getDownloadURL(imageRef);
      const newFeed = {
        id: crypto.randomUUID(),
        title,
        content,
        date: new Date().toLocaleString(),
        isEdited: false,
        writer: user,
        img: downloadURL
      };
      await uploadFeed(newFeed);
    }

    alert("작성 완료!");
    setTitle("");
    setContent("");
    e.target.file.value = "";
    navigate("/home");
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files?.[0]);
  };
  return (
    <>
      <div className="form-content">
        <form onSubmit={onSubmit}>
          제목 : <input type="text" onChange={onChange} value={title} name="title" />
          <br />
          내용 : <textarea type="text" onChange={onChange} value={content} name="content" />
          <br />
          <input type="file" onChange={handleFileSelect} name="file" />
          <button>작성하기</button>
        </form>
      </div>
    </>
  );
}

export default FeedForm;
