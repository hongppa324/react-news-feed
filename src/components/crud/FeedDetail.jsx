import React from "react";
import { useState, useEffect } from "react";
import { collection, doc, query, where, getDocs, updateDoc, Timestamp, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { useParams } from "react-router-dom";
import { db, authService, storage } from "../../firebase";

function FeedDetail() {
  const [detailFeed, setDetailFeed] = useState([]);
  const [newContent, setNewContent] = useState("");
  //   const [docID, setdocID] = useState("");
  const [click, setClick] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const postId = params.id;
  //   console.log("param", postId);

  useEffect(() => {
    const fetchData = async () => {
      console.log(1);
      const col = collection(db, "newsFeed");
      const q = query(col, where("id", "==", postId));
      const querySnapshot = await getDocs(col);
      console.log(2);

      if (querySnapshot.empty) {
        console.log(3);
        console.log("오류,,,");
        return;
      }
      console.log(4);

      let docID = "";
      const item = querySnapshot.docs.map((doc) => {
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
      //   console.log("item", item);
      //   console.log("docID", docID);
      const findData = item.find((e) => {
        // console.log("e.id", e);
        return e.postId === postId;
      });
      //   console.log("찾은데이터", findData);
      setDetailFeed(findData);

      console.log(5);
    };

    fetchData();
  }, []);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      // console.log("현재 로그인 된 유저", user);
    });
  }, []);

  //현재 사용자 불러오기

  //   console.log("useEffec밖", detailFeed);
  const userName = authService.currentUser.displayName;

  //   console.log("유저", userName);

  //피드 수정
  const editHandler = () => {};

  const gotoHome = (e) => {
    alert("홈으로 이동하겠습니까?");
    navigate("/home");
  };

  // const detail = detailFeed;
  if (!detailFeed) {
    return;
  }
  //   console.log("찾은데이터", detailFeed);

  const { writer, content, date, isEdited, img } = detailFeed;

  const onChange = (e) => {
    const editContent = e.target.value;
    console.log(editContent);
    if (!editContent) {
      alert("내용을 입력해주세요");
      return;
    }
    setNewContent(editContent);
  };

  //   ///사진 삭제 구현 수정중....
  const deleteImg = async () => {
    try {
      const defaultImg = ref(storage, `/defaultImg/background.png`);
      if (defaultImg) {
        alert("기본 이미지입니다.");
        return;
      }
      const desertRef = ref(storage, img);
      await deleteObject(desertRef);
      alert("사진이 삭제됐습니다. 마저 수정을 완료해주세요");
    } catch (error) {
      console.log("사진 errorCode=>", error.errorCode);
    }
  };

  const changeContent = async (e) => {
    e.preventDefault();
    console.log("원래 내용", content);
    console.log("수정 내용", newContent);
    if (newContent === content) {
      alert("수정값이 없습니다.");
      return;
    }
    const editFeedRef = doc(db, "newsFeed", postId);
    await updateDoc(editFeedRef, {
      detailFeed,
      content: newContent,
      date: Timestamp.fromDate(new Date()),
      isEdited: !detailFeed.isEdited
    });

    alert("수정이 완료됐습니다.");
    navigate("/home");
  };

  //   삭제
  const deleteHandler = async () => {
    alert("삭제하시겠습니까?");
    await deleteDoc(doc(db, "newsFeed", postId));
    navigate("/home");
  };

  return (
    <>
      작성자 : {writer} <br />
      내용 : {content}
      <br />
      날짜 : {date}
      <br />
      편집여부 : {isEdited}
      <br />
      <img src={img} style={{ width: "200px", height: "200px" }} />
      {writer !== userName ? "" : <button onClick={editHandler}>수정하기</button>}
      {writer !== userName ? "" : <button onClick={deleteHandler}>삭제하기</button>}
      <button onClick={gotoHome}>홈으로 돌아가기</button>
      <br />
      <form onSubmit={changeContent}>
        <textarea defaultValue={content} type="text" name="newContent" onChange={onChange} />
        <button>수정완료</button>
      </form>
      <br />
      <button onClick={deleteImg}>사진삭제</button>
    </>
  );
}

export default FeedDetail;
