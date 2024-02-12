<<<<<<< HEAD
// import React from "react";
// import { useState, useEffect } from "react";
// import {
//   collection,
//   query,
//   doc,
//   addDoc,
//   deleteDoc,
//   Timestamp,
//   orderBy,
//   onSnapshot,
//   startAt,
//   limit,
//   getDocs
// } from "firebase/firestore";
// import { db, auth, storage } from "../api/crudFirebase";
// import { useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
=======
import React from "react";
import { useState, useEffect } from "react";
import { collection, query, doc, addDoc, deleteDoc, Timestamp, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth, storage } from "../api/crudFirebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import defaultImg from "../assets/img/쿼카.jpg";
>>>>>>> 766410739a085f3eb6b946676c4aeb458e60dcc6

// function NewsFeed() {
//   const navigate = useNavigate();

//   const [feed, setFeed] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       // console.log("현재 로그인 된 유저", user);
//     });
//   }, []);

//   //현재 사용자 불러오기
//   const user = auth.currentUser;

//   // 컬렉션에 있는 값 가져오기
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
//         setFeed(docFeed);
//         //마지막으로 볼 수 있는 문서 가져오기

//         // 이 문서에서 시작하는 새 쿼리를 구성합니다,
//       });
//     };

//     fetchData();
//   }, []);

//   const onChange = (event) => {
//     const {
//       target: { name, value }
//     } = event;
//     if (name === "content") {
//       setContent(value);
//     }
//     if (name === "title") {
//       setTitle(value);
//     }
//   };

<<<<<<< HEAD
//   //글 추가하기
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || !content) {
//       alert("빈곳없이 다 작성해주세요!");
//       return;
//     }

//     if (!selectedFile) {
//       alert("사진을 추가해주세요!");
//       return;
//     }

//     //기본이미지
//     const defaultRef = ref(storage, "/defaultImg/쿼카.jpg");
//     const defaultImgdURL = await getDownloadURL(defaultRef);
//     console.log("테스트", defaultImgdURL);

//     //파일 업로드
//     const imageRef = ref(storage, `${auth.currentUser.email}/${selectedFile.name}`);
//     await uploadBytes(imageRef, selectedFile);
//     const downloadURL = await getDownloadURL(imageRef);

//     const newFeed = {
//       id: crypto.randomUUID(),
//       title,
//       content,
//       date: new Date().toLocaleString(),
//       isEdited: false,
//       writer: user.email,
//       img: !selectedFile ? defaultImgdURL : downloadURL
//     };
//     setFeed([newFeed, ...feed]);
=======
  const handleFileSelect = (e) => {
    // 파일을 선택한 경우에는 첫 번째 파일을, 선택하지 않은 경우에는 null 값을 file
    setSelectedFile(e.target.files?.[0]);
  };

  //글 추가하기
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("빈곳없이 다 작성해주세요!");
      return;
    }

    //if(selectedFile){    }
    const imageRef = ref(storage, `${auth.currentUser.uid}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);
    const downloadURL = await getDownloadURL(imageRef);

    console.log("이미지 있을 때", downloadURL);

    //기본이미지
    const defaultRef = ref(storage, "/defaultImg/쿼카.jpg");
    const defaultImgdURL = await getDownloadURL(defaultRef);
    console.log("이미지 없을 때", defaultImgdURL);

    const imgURL = selectedFile ? downloadURL : defaultImgdURL;
    console.log("결과", imgURL);

    const newFeed = {
      id: crypto.randomUUID(),
      title,
      content,
      date: new Date().toLocaleString(),
      isEdited: false,
      writer: user.email,
      img: imgURL
    };
    setFeed([newFeed, ...feed]);
>>>>>>> 766410739a085f3eb6b946676c4aeb458e60dcc6

//     const newsFeedRef = collection(db, "newsFeed");
//     await addDoc(newsFeedRef, { ...newFeed, date: Timestamp.fromDate(new Date()) });

<<<<<<< HEAD
//     alert("작성 완료!");
//     setTitle("");
//     setContent("");
//     e.target.file.value = "";
//     //사진input 값 reset
//   };

//   const handleFileSelect = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };
//   //삭제 & 수정
//   const deleteHandler = async (selectFeed) => {
//     alert("정말 삭제하시겠습니까?");
//     const deleteFeed = feed.filter((allFeed) => {
//       return allFeed.id !== selectFeed;
//     });
//     setFeed(deleteFeed);
//     const newsFeedRef = doc(db, "newsFeed", selectFeed);
//     await deleteDoc(newsFeedRef);
//   };
=======
    alert("작성 완료!");
    setTitle("");
    setContent("");
    e.target.file.value = "";
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
>>>>>>> 766410739a085f3eb6b946676c4aeb458e60dcc6

//   const editHandler = (selectFeed) => {
//     alert("현재 사진삭제가 반영이 안됩니다 ^^");
//     const editFeed = feed.find((allFeed) => {
//       return allFeed.id === selectFeed;
//     });

//     navigate("/feedItem", { state: { editFeed } });
//   };
//   //파일 업로드
//   return (
//     <>
//       <br />
//       <br />
//       <br />
//       <br />

//       <div>
//         {feed.map((e) => {
//           return (
//             <div key={e.id} style={{ border: "1px solid blue" }}>
//               <div> 제목 : {e.title}</div>
//               <div> 내용 : {e.content}</div>
//               <div>사진 </div>
//               <div>{e.date}</div>
//               <div>{!e.isEdited ? "" : "(수정됨)"}</div>
//               <div>작성자 : {e.writer}</div>
//               <div>
//                 <img src={e.img} style={{ width: "200px", height: "200px" }} alt="사진이없어용" />
//               </div>
//               {e.writer !== user.email ? "" : <button onClick={() => editHandler(e.id)}>수정하기</button>}
//               {e.writer !== user.email ? "" : <button onClick={() => deleteHandler(e.id)}>삭제하기</button>}

//               <br />
//               <br />
//               <br />
//               <br />
//             </div>
//           );
//         })}
//       </div>

//       <div>
//         <form onSubmit={onSubmit}>
//           제목 : <input type="text" onChange={onChange} value={title} name="title" />
//           <br />
//           내용 : <textarea type="text" onChange={onChange} value={content} name="content" />
//           <br />
//           <input type="file" onChange={handleFileSelect} name="file" />
//           <button>작성하기</button>
//         </form>
//         <br />
//         <br />
//         <br />
//         <br />
//       </div>
//     </>
//   );
// }

// export default NewsFeed;
