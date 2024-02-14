import React from "react";
import { useState, useEffect } from "react";
import { collection, query, doc, addDoc, deleteDoc, Timestamp, orderBy, onSnapshot } from "firebase/firestore";
import { db, authService, storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const { id } = useParams();

  const FeedData = useSelector((state) => state.FeeRedux);
  console.log("feedData", FeedData);

  const [feed, setFeed] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  //현재 사용자 정보불러오기
  const userInfo = useSelector((state) => state.UserInfo.userInfo);
  //현재 사용자 정보불러오기
  // console.log("userInfo", userInfo);

  useEffect(() => {
    const fetchData = async () => {
      //문서의 첫페이지 조회
      const q = query(collection(db, "newsFeed"), orderBy("date", "desc"));

      onSnapshot(q, (querySnapshot) => {
        const docFeed = querySnapshot.docs.map((doc) => {
          return {
            postId: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            isEdited: doc.data().isEdited,
            date: doc.data().date.toDate().toLocaleString(),
            writer: doc.data().writer,
            img: doc.data().img
          };
        });
        setFeed(docFeed);
      });
    };

    fetchData();
  }, []);

  //글 작성 이동
  const writeToFeed = () => {
    navigate("/feedWrite");
  };

  return (
    <>
      <nav style={{ border: "1px solid black", display: "flex", height: "40px" }}>
        <p>안녕하세요 {userInfo.name} 님 !</p>
        <button>내프로필</button>
        <button onClick={writeToFeed}>글작성하기</button>
        <button>홈으로가기</button>
      </nav>
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
              <Link to={`/home/${e.postId}`} style={{ textDecoration: "none", color: "black" }}>
                <li key={e.postId}>
                  <div className="content-wrap" style={{ border: "1px solid black", width: "320px", height: "350px" }}>
                    <div className="img" style={{ border: "1px solid black", height: "200px" }}>
                      <img src={e.img} style={{ width: "320px", height: "200px" }} alt="사진이없어용" />
                    </div>
                    <div className="content" style={{ height: "150px" }}>
                      <div className="title" style={{ border: "1px solid black", height: "25px" }}>
                        제목 : {e.title}
                      </div>
                      <div className="text" style={{ border: "1px solid black", height: "50px" }}>
                        글내용 : {e.content}
                      </div>
                      <div className="time-wrap" style={{ border: "1px solid black", height: "25px" }}>
                        <div className="time" style={{ border: "1px solid black" }}>
                          {e.date}
                        </div>
                      </div>
                      <div className="writer" style={{ border: "1px solid black", height: "25px" }}>
                        {e.writer} / 좋아요 <Link to={`/comment/${e.postId}`}>댓글</Link> /
                        {!e.isEdited ? "" : "(수정됨)"}
                      </div>
                    </div>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Home;
