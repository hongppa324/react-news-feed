import React from "react";
import { useState, useEffect } from "react";
import { collection, doc, query, where, getDocs, updateDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { useParams } from "react-router-dom";
import { db, storage } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { deleteFeed } from "../../redux/modules/FeedRedux";

function FeedDetail() {
  const [detailFeed, setDetailFeed] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [click, setClick] = useState(false);
  const [newContent, setNewContent] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const col = collection(db, "newsFeed");
      const q = query(col, where("id", "==", postId));
      const querySnapshot = await getDocs(col);

      if (querySnapshot.empty) {
        console.log("불러올 피드가 없습니다!");
        return;
      }

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

      const findData = item.find((e) => {
        return e.postId === postId;
      });

      setDetailFeed(findData);
      setNewContent(findData.content);
      console.log("1111111", newContent);
    };

    fetchData();
  }, []);

  //현재 사용자 불러오기
  const userInfo = useSelector((state) => state.UserInfo.userInfo);
  //피드 수정
  const editHandler = () => {
    setClick(!click);
  };

  const gotoHome = (e) => {
    alert("홈으로 이동하겠습니까?");
    navigate("/home");
  };

  if (!detailFeed) {
    return;
  }

  const { writer, content, title, date, isEdited, img, postId: id } = detailFeed;

  const onChange = async (e) => {
    const editContent = e.target.value;

    if (!editContent) {
      alert("내용을 입력해주세요");
      setNewContent("");
      return;
    }

    setNewContent(editContent);
  };

  const changeContent = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      if (newContent.length === 0) {
        alert("내용 입력하라구요!!");
        return;
      }
      if (newContent === content) {
        alert("변경 내용이 없어용 ㅠㅠ");
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
    } else {
      const imageRef = ref(storage, `${userInfo.email}/${selectedFile.name}`);
      await uploadBytes(imageRef, selectedFile);
      const downloadURL = await getDownloadURL(imageRef);
      const editFeedRef = doc(db, "newsFeed", postId);
      await updateDoc(editFeedRef, {
        detailFeed,
        content: newContent,
        img: downloadURL,
        date: Timestamp.fromDate(new Date()),
        isEdited: !detailFeed.isEdited
      });

      alert("수정이 완료됐습니다.");
      navigate("/home");
    }
  };

  //   삭제
  const deleteHandler = async () => {
    alert("삭제하시겠습니까?");
    await dispatch(deleteFeed(postId));
    navigate("/home");
  };

  const deleteImg = async () => {
    try {
      const selectRef = ref(storage, `${img}`);
      const downdURL = await getDownloadURL(selectRef);

      if (downdURL.includes("defaultImg")) {
        alert("기본 이미지는 삭제할 수 없습니다!");
        return;
      }
      await deleteObject(selectRef);
      alert("사진이 삭제됐습니다. 마저 수정을 완료해주세요");

      try {
        const oneRef = doc(db, "newsFeed", postId);

        const defaultRef = ref(storage, `/defaultImg/background.png`);
        const defaultImgdURL = await getDownloadURL(defaultRef);

        await updateDoc(oneRef, {
          img: defaultImgdURL
        });
      } catch (error) {
        console.log("디비삭제 errorCode=>", error.errorCode);
      }
    } catch (error) {
      console.log("사진삭제 errorCode=>", error.errorCode);
    }
  };

  //사진변경
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files?.[0]);
  };

  return (
    <>
      작성자 : {writer} <br />
      <br />
      제목 : {title}
      <br />
      <br />
      내용 :
      {!click ? (
        content
      ) : (
        <form onSubmit={changeContent}>
          <textarea defaultValue={content} type="text" name="newContent" onChange={onChange} />
          <br />

          <button>수정완료</button>
        </form>
      )}
      <br />
      <br />
      날짜 : {date}
      <br />
      <br />
      <br />
      {isEdited ? "" : "편집여부 :수정됨"}
      <br />
      -----------사진 삭제 테스트
      {!click ? "" : <button onClick={() => deleteImg(img)}>사진삭제</button>}
      {!click ? "" : <input type="file" onChange={handleFileSelect} name="file" />}
      <br />
      <img src={img} style={{ width: "200px", height: "200px" }} />
      <br />
      {!click ? writer !== userInfo.name ? "" : <button onClick={editHandler}>내용수정</button> : ""}
      {writer !== userInfo.name ? "" : <button onClick={deleteHandler}>삭제하기</button>}
      <button onClick={gotoHome}>홈으로 돌아가기</button>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default FeedDetail;
