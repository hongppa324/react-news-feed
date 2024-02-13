import React from "react";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";

function FeedDetail() {
  const [detailFeed, setDetailFeed] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const dbId = params.id;
  console.log(dbId);

  useEffect(() => {
    const fetchData = async () => {
      //문서의 첫페이지 조회
      const col = collection(db, "newsFeed");
      const q = query(col, where("id", "==", dbId));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => doc.data());

      console.log(items);
    };

    fetchData();
  }, []);

  //피드 삭제
  const deleteHandler = async (selectFeed) => {
    alert("정말 삭제하시겠습니까?");
    // const deleteFeed = feed.filter((allFeed) => {
    //   return allFeed.id !== selectFeed;
    // });
    // setFeed(deleteFeed);
    // const newsFeedRef = doc(db, "newsFeed", selectFeed);
    // await deleteDoc(newsFeedRef);
  };

  //피드 수정
  const editHandler = (selectFeed) => {};

  const gotoHome = (e) => {
    alert("홈으로 이동하겠습니까?");
    navigate("/home");
  };
  return (
    <>
      넹?
      {/* <div>날짜 : {date}</div>
      <div>작성자 : {writer}</div> <br />
      <div>수정여부 : {!isEdited ? "수정됨" : ""}</div>
      <br />
      <div>제목 : {title}</div> <br />
      <div>내용 : {content}</div> <br />
      <button onClick={gotoHome}>홈으로 돌아가기</button> */}
    </>
  );
}

export default FeedDetail;
