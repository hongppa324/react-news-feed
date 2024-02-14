import React from "react";
import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import styled from "styled-components";
import { useSelector } from "react-redux";

function FeedForm() {
  const [feed, setFeed] = useState([]);
  //피드 redux
  const FeedData = useSelector((state) => state.FeeRedux);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.UserInfo.userInfo);

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
      setFeed([img, ...feed]);
      const newsFeedRef = collection(db, "newsFeed");
      await addDoc(newsFeedRef, { ...img, date: Timestamp.fromDate(new Date()) });
      setSelectedFile(null);
    };

    if (!selectedFile) {
      const defaultRef = ref(storage, `/defaultImg/background.png`);
      const defaultImgdURL = await getDownloadURL(defaultRef);
      const newFeed = {
        postId: crypto.randomUUID(),
        title,
        content,
        date: new Date().toLocaleString(),
        isEdited: false,
        writer: userInfo.name,
        img: defaultImgdURL,
        likes: {
          likeCount: 0,
          users: []
        }
      };
      await uploadFeed(newFeed);
    } else {
      // 파일 업로드
      const imageRef = ref(storage, `${userInfo.email}/${selectedFile.name}`);
      await uploadBytes(imageRef, selectedFile);
      const downloadURL = await getDownloadURL(imageRef);
      const newFeed = {
        postId: crypto.randomUUID(),
        title,
        content,
        date: new Date().toLocaleString(),
        isEdited: false,
        writer: userInfo.name,
        img: downloadURL, // 좋아요 default 값 추가
        likes: {
          likeCount: 0,
          users: []
        }
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

  const writingCancle = (e) => {
    alert("작성을 취소하겠습니까?");
    navigate("/home");
  };

  return (
    <>
      {/* 전체 컨테이너 wrap */}
      <FormWrapper>
        {/* 컨테이너 wrap */}
        <FormBackImg>
          {/* 박스1 */}
          {/* <FormBox /> */}

          {/* 박스2 */}
          <FormBox>
            {/* form css */}
            <FormContent className="form-content">
              <form onSubmit={onSubmit}>
                <div
                  style={{
                    height: "100px",
                    width: "850px"
                  }}
                >
                  <FeedTitle
                    type="text"
                    onChange={onChange}
                    value={title}
                    name="title"
                    placeholder="제목을 입력하세요"
                  />
                </div>
                <div style={{ height: "50px", alignItems: "center", justifyContent: "center" }}>
                  <input type="file" onChange={handleFileSelect} name="file" />
                </div>
                <div style={{ height: "450px" }}>
                  <FeedContent
                    type="text"
                    onChange={onChange}
                    value={content}
                    name="content"
                    placeholder="당신의 이야기를 적어보세요..."
                  />
                </div>
                {/* 버튼 */}
                <div display={{ alignItems: "center", justifyContent: "center" }}>
                  <FormButton onClick={writingCancle}>작성취소</FormButton>
                  <FormButton>작성하기</FormButton>
                </div>
              </form>
            </FormContent>
          </FormBox>

          {/* 박스3 */}
          <div style={{ border: "1px solid black", flex: "1" }}></div>
        </FormBackImg>
      </FormWrapper>
    </>
  );
}

const FormWrapper = styled.div``;

const FormBackImg = styled.div`
  background-image: url("../../assets/img/background.png");
  display: flex;
  height: 100%;
`;

const FormBox = styled.div`
  background-color: red;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  align-items: center;
  justify-content: center;
  background-color: red;
`;

const FeedTitle = styled.input`
  font-size: 35px;
  width: 850px;
  height: 100px;
  outline: none;
  border: none;
  border-bottom: 2px solid gray;
`;

const FeedContent = styled.textarea`
  width: 850px;
  height: 450px;
  resize: none;
  outline: none;
  font-size: 15px;
`;

const FormButton = styled.button`
  padding: 1vh;
  border: 0.2rem solid black;
  border-radius: 0.5rem;
  background-color: white;
  font-family: "nanum";
  font-size: 2vh;
  cursor: pointer;
`;

/* style={{ border: "1px solid black", height: "100vh" }} */

export default FeedForm;
