// import React from "react";
// import { useState, useEffect } from "react";
// import { collection, query, doc, deleteDoc, Timestamp, orderBy, onSnapshot } from "firebase/firestore";
// import { db } from "../../firebase";
// import { useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { useParams } from "react-router-dom";

// function FeedDetail() {
//   const [detailFeed, setDetailFeed] = useState([]);
//   const params = useParams();
//   const navigate = useNavigate();
//   console.log(params);

//   useEffect(() => {
//     const fetchData = async () => {
//       //문서의 첫페이지 조회
//       const q = query(collection(db, "newsFeed"), orderBy("date", "desc"));

//       onSnapshot(q, (querySnapshot) => {
//         const docFeed = querySnapshot.docs.map((doc) => {
//           return {
//             id: doc.id,
//             title: doc.data().title,
//             content: doc.data().content,
//             isEdited: doc.data().isEdited,
//             date: doc.data().date.toDate().toLocaleString(),
//             writer: doc.data().writer,
//             img: doc.data().img
//           };
//         });
//         setDetailFeed(docFeed);
//       });
//     };

//     fetchData();
//   }, []);

//   //피드 삭제
//   const deleteHandler = async (selectFeed) => {
//     alert("정말 삭제하시겠습니까?");
//     // const deleteFeed = feed.filter((allFeed) => {
//     //   return allFeed.id !== selectFeed;
//     // });
//     // setFeed(deleteFeed);
//     // const newsFeedRef = doc(db, "newsFeed", selectFeed);
//     // await deleteDoc(newsFeedRef);
//   };

//   //피드 수정
//   const editHandler = (selectFeed) => {};

//   console.log("detailFeed", detailFeed);

//   const feedData = detailFeed.find((e) => {
//     return e.id === params.id;
//   });

//   console.log("?????", feedData);

//   const { title, content, date, writer, isEdited } = feedData;
//   const gotoHome = (e) => {
//     alert("홈으로 이동하겠습니까?");
//     navigate("/home");
//   };
//   return (
//     <>
//       <div>날짜 : {date}</div>
//       <div>작성자 : {writer}</div> <br />
//       <div>수정여부 : {!isEdited ? "수정됨" : ""}</div>
//       <br />
//       <div>제목 : {title}</div> <br />
//       <div>내용 : {content}</div> <br />
//       <button onClick={gotoHome}>홈으로 돌아가기</button>
//     </>
//   );
// }

// export default FeedDetail;
