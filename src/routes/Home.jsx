import React from "react";
import { useState, useEffect } from "react";
import { collection, query, doc, addDoc, deleteDoc, Timestamp, orderBy, onSnapshot } from "firebase/firestore";
import { db, authService, storage } from "../api/crudFirebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [feed, setFeed] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      // console.log("현재 로그인 된 유저", user);
    });
  }, []);

  //현재 사용자 불러오기
  const user = authService.currentUser;

  // 컬렉션에 있는 값 가져오기
  useEffect(() => {
    const fetchData = async () => {
      //문서의 첫페이지 조회
      const q = query(collection(db, "newsFeed"), orderBy("date", "desc"));

      onSnapshot(q, (querySnapshot) => {
        const docFeed = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            isEdited: doc.data().isEdited,
            date: doc.data().date.toDate().toLocaleString(),
            writer: doc.data().writer,
            img: doc.data().img
          };
        });
        setFeed(docFeed);
        //마지막으로 볼 수 있는 문서 가져오기

        // 이 문서에서 시작하는 새 쿼리를 구성합니다,
      });
    };

    fetchData();
  }, []);

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

    if (!selectedFile) {
      alert("사진을 추가해주세요!");
      return;
    }

    //기본이미지
    const defaultRef = ref(storage, "/defaultImg/쿼카.jpg");
    const defaultImgdURL = await getDownloadURL(defaultRef);
    console.log("테스트", defaultImgdURL);

    //파일 업로드
    const imageRef = ref(storage, `${authService.currentUser.email}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);
    const downloadURL = await getDownloadURL(imageRef);

    const newFeed = {
      id: crypto.randomUUID(),
      title,
      content,
      date: new Date().toLocaleString(),
      isEdited: false,
      writer: user.displayName,
      img: !selectedFile ? defaultImgdURL : downloadURL
    };
    setFeed([newFeed, ...feed]);

    const newsFeedRef = collection(db, "newsFeed");
    await addDoc(newsFeedRef, { ...newFeed, date: Timestamp.fromDate(new Date()) });

    alert("작성 완료!");
    setTitle("");
    setContent("");
    e.target.file.value = "";
    //사진input 값 reset
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  //삭제 & 수정
  const deleteHandler = async (selectFeed) => {
    alert("정말 삭제하시겠습니까?");
    const deleteFeed = feed.filter((allFeed) => {
      return allFeed.id !== selectFeed;
    });
    setFeed(deleteFeed);
    const newsFeedRef = doc(db, "newsFeed", selectFeed);
    await deleteDoc(newsFeedRef);
  };

  const editHandler = (selectFeed) => {
    alert("현재 사진삭제가 반영이 안됩니다 ^^");
    const editFeed = feed.find((allFeed) => {
      return allFeed.id === selectFeed;
    });

    navigate("/feedItem", { state: { editFeed } });
  };
  //파일 업로드
  return (
    <>
      <nav style={{ border: "1px solid black", display: "flex", height: "40px" }}>
        <p>안녕하세요 {user.displayName}님 !</p>
        <button>내프로필</button>
        <button>글쓰기</button>
        <button>홈으로가기</button>
        <button>정렬기능</button>
      </nav>

      <div>
        <form onSubmit={onSubmit}>
          제목 : <input type="text" onChange={onChange} value={title} name="title" />
          <br />
          내용 : <textarea type="text" onChange={onChange} value={content} name="content" />
          <br />
          <input type="file" onChange={handleFileSelect} name="file" />
          <button>작성하기</button>
        </form>
      </div>

      <div className="home-wrap" style={{ border: "1px solid black", margin: "1rem" }}>
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            textAlign: "center"
          }}
        >
          {feed.map((e) => {
            return (
              <li key={e.id}>
                <div className="content-wrap" style={{ border: "1px solid black", width: "320px", height: "350px" }}>
                  <div className="img" style={{ border: "1px solid black", height: "200px" }}>
                    <img src={e.img} style={{ width: "320px", height: "200px" }} alt="사진이없어용" />
                  </div>
                  <div className="content" style={{ height: "150px" }}>
                    <div className="title" style={{ border: "1px solid black", height: "25px" }}>
                      제목 : {e.title}
                    </div>
                    <div className="text" style={{ border: "1px solid black", height: "50px" }}>
                      글내용 : : {e.content}
                    </div>
                    <div className="time-wrap" style={{ border: "1px solid black", height: "25px" }}>
                      <div className="time" style={{ border: "1px solid black" }}>
                        {e.date}
                      </div>
                    </div>
                    <div className="writer" style={{ border: "1px solid black", height: "25px" }}>
                      {e.writer} / 좋아요 <Link to="/home">댓글</Link>
                    </div>
                    <div className="buttons">
                      {e.writer !== user.displayName ? "" : <button onClick={() => editHandler(e.id)}>수정하기</button>}
                      {e.writer !== user.displayName ? (
                        ""
                      ) : (
                        <button onClick={() => deleteHandler(e.id)}>삭제하기</button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* <main>
        <section style={{ border: "1px solid black" }}>
          <article style={{ border: "1px solid blue" }}>
            1
            <figure>
              내용
              <div>사진</div>
              <div>
                <div>제목</div>
                <div>글내용</div>
                <div>
                  <div>시간</div>
                </div>
              </div>
              <div>작성자</div>
            </figure>
          </article>
          <article style={{ border: "1px solid blue" }}>
            2<figure>내용</figure>
          </article>
          <article style={{ border: "1px solid blue" }}>
            3<figure>내용</figure>
          </article>
          <article style={{ border: "1px solid blue" }}>
            4<figure>내용</figure>
          </article>
          <article style={{ border: "1px solid blue" }}>
            5<figure>내용</figure>
          </article>
          <article style={{ border: "1px solid blue" }}>
            6<figure>내용</figure>
          </article>
        </section>
      </main> */}
      {/* <div>
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
              {e.writer !== user.displayName ? "" : <button onClick={() => editHandler(e.id)}>수정하기</button>}
              {e.writer !== user.displayName ? "" : <button onClick={() => deleteHandler(e.id)}>삭제하기</button>}
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <br />
      <br />
      <div>
        <form onSubmit={onSubmit}>
          제목 : <input type="text" onChange={onChange} value={title} name="title" />
          <br />
          내용 : <textarea type="text" onChange={onChange} value={content} name="content" />
          <br />
          <input type="file" onChange={handleFileSelect} name="file" />
          <button>작성하기</button>
        </form>
      </div>
      <br />
      <br /> */}
    </>
  );
}

export default Home;
