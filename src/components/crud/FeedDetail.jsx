import React from "react";
import { useState, useEffect } from "react";
import { collection, doc, query, where, getDocs, updateDoc, Timestamp, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { useParams } from "react-router-dom";
import { db, storage } from "../../firebase";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FcLike } from "react-icons/fc";
import { FaUser } from "react-icons/fa6";

function FeedDetail() {
  const [detailFeed, setDetailFeed] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [otherFeed, setOtherFeed] = useState([]);
  const [click, setClick] = useState(false);
  const [newContent, setNewContent] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  const postId = params.id;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = query(collection(db, `comments-${postId}`));
        const querySnapshot = await getDocs(q);

        const initialComments = [];

        querySnapshot.forEach((doc) => {
          initialComments.push({
            id: doc.id,
            content: doc.data().content,
            createdAt: doc.data().createdAt,
            writer: doc.data().writer,
            isEditing: doc.data().isEditing
          });
        });

        setComments(initialComments);
      } catch (error) {
        console.error("오류가 발생했습니다! : ", error);
      }
    };

    fetchComments();
  }, []);

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
          img: doc.data().img,
          likes: doc.data().likes.likeCount
        };
      });

      const findData = item.find((e) => {
        return e.postId === postId;
      });

      setDetailFeed(findData);
      setNewContent(findData.content);

      const otherData = item
        .filter((e) => {
          return e.postId !== postId;
        })
        .slice(0, 4)
        .map((e) => e);

      setOtherFeed(otherData);
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

  if (!otherFeed) {
    return;
  }

  const { writer, content, title, date, isEdited, img, postId: id, likes } = detailFeed;

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
        alert("입력된 내용이 없습니다.");
        return;
      }
      if (newContent === content) {
        alert("변경된 내용이 없습니다.");
        return;
      }

      //사진수정
      const editFeedRef = doc(db, "newsFeed", postId);

      await updateDoc(editFeedRef, {
        detailFeed,
        content: newContent,
        date: Timestamp.fromDate(new Date()),
        isEdited: true
      });

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
        isEdited: true
      });

      alert("수정이 완료됐습니다.");
      navigate("/home");
    }
  };

  //삭제
  const deleteHandler = async () => {
    alert("게시글을 삭제하시겠습니까?");
    await deleteDoc(doc(db, "newsFeed", postId));

    navigate("/home");
  };

  const deleteImg = async () => {
    try {
      const selectRef = ref(storage, `${img}`);
      const downdURL = await getDownloadURL(selectRef);

      if (downdURL.includes("defaultImg")) {
        alert("기본 이미지는 삭제할 수 없습니다.");
        return;
      }
      await deleteObject(selectRef);
      alert("사진을 삭제중입니다. 마저 수정을 완료해주세요");

      try {
        const oneRef = doc(db, "newsFeed", postId);
        const defaultRef = ref(storage, `/defaultImg/background.png`);
        const defaultImgdURL = await getDownloadURL(defaultRef);

        await updateDoc(oneRef, {
          img: defaultImgdURL
        });
      } catch (error) {
        console.log("디비 오류발생! =>", error.errorCode);
      }
    } catch (error) {
      console.log("사진삭제 오류발생! =>", error.errorCode);
    }
  };

  //사진변경
  const handleFileSelect = (e) => {
    alert("사진을 변경 중입니다. 마저 수정해주세요! ");
    setSelectedFile(e.target.files?.[0]);
  };

  const goToHome = () => {
    alert("홈으로 이동합니다");
    navigate("/home");
  };
  const goToCommentList = () => {
    navigate(`/comment/${postId}`);
  };

  const goToMyPage = () => {
    navigate("/my-page");
  };

  return (
    <>
      <section>
        <FeedAllWrap>
          <section>
            <FeedBorderWrap>
              <ContentWrap>
                <MainWrap>
                  <Header>
                    <FeedInfo>
                      <section>
                        <FaUser />
                        {writer}
                      </section>
                      <WritedAt> {date}</WritedAt>
                    </FeedInfo>
                    <GotoHome> {!isEdited ? "" : "(수정됨)"}</GotoHome>
                  </Header>

                  <FeedMain>
                    <FeedTitle> {title}</FeedTitle>
                    <FeedImg>
                      <FeedItemImg src={img} />
                    </FeedImg>
                    <FeedContent>
                      {!click ? (
                        content
                      ) : (
                        <form onSubmit={changeContent}>
                          <FeedArea defaultValue={content} type="text" name="newContent" onChange={onChange} />
                          <br />
                          <EditDone>수정완료</EditDone>
                          <label className="input-file-button" for="input-file" style={{ marginLeft: "20px" }}>
                            [사진 변경 시 클릭하세요]
                          </label>
                          {!click ? (
                            ""
                          ) : (
                            <FileInput type="file" id="input-file" onChange={handleFileSelect} name="file" />
                          )}
                        </form>
                      )}
                    </FeedContent>
                  </FeedMain>
                </MainWrap>

                <FeedEtc>
                  <FeedLikes>
                    <FcLike />
                    {likes}
                  </FeedLikes>
                  {comments && comments.length > 0 ? (
                    comments.slice(0, 2).map((e, index) => (
                      <FeedComments key={e.id}>
                        <>
                          {e.content} - <WritedAt>{e.createdAt}</WritedAt>
                        </>
                      </FeedComments>
                    ))
                  ) : (
                    <p>첫 번째 댓글을 작성해주세요!</p>
                  )}
                  <br />

                  <HomeBtn onClick={goToCommentList}>전체보기</HomeBtn>
                </FeedEtc>
              </ContentWrap>
            </FeedBorderWrap>
          </section>
          {/*wrap*/}

          {/* 네비게이션 */}
          <FeedNavi>
            <FeedButton>
              <HomeBtn onClick={goToHome}>홈으로가기</HomeBtn>
            </FeedButton>
            <FeedButton>
              <MyPageBtn onclick={() => goToMyPage(postId)}>마이페이지</MyPageBtn>
            </FeedButton>

            <FeedButton>
              {!click ? writer !== userInfo.name ? "" : <EditDone onClick={editHandler}>내용 수정</EditDone> : ""}
              {!click ? "" : <DeleteImg onClick={() => deleteImg(img)}>사진 지우기</DeleteImg>}
            </FeedButton>
            <FeedButton>
              {writer !== userInfo.name ? "" : <FeedDeleteBtn onClick={deleteHandler}>게시글 삭제</FeedDeleteBtn>}
            </FeedButton>
          </FeedNavi>
        </FeedAllWrap>
      </section>

      {/* 다른글 */}
      <AddFeedWrap>
        {otherFeed.map((e) => {
          return (
            <AddFeeds>
              <p>
                <OtherItemImg src={e.img} />
              </p>
              <span>{e.title}</span>
              <p> {e.content}</p>
              <p>
                <FaUser /> {e.writer}
              </p>
            </AddFeeds>
          );
        })}
      </AddFeedWrap>
    </>
  );
}

export default FeedDetail;

const FeedAllWrap = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: space-around;
  height: 800px;
  width: 1500px;
  display: flex;
`;

const FeedBorderWrap = styled.div`
  margin: 1rem;
  border: 1px solid #d2d2d2;
  border-radius: 40px;
  width: 820px;
  height: 750px;
`;

const FeedItemWrap = styled.div``;

const ContentWrap = styled.div`
  margin: 1rem;
  width: 800px;
  height: 700px;
`;

const MainWrap = styled.div`
  height: 80%;
`;

const Header = styled.div`
  display: flex;
`;

const FeedInfo = styled.div`
  width: 90%;
`;

const GotoHome = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 10%;
  text-align: center;
`;

const FeedMain = styled.div`
  height: 100%;
`;

const FeedTitle = styled.div`
  height: 10%;
  font-size: 35px;
  display: flex;
  border-top: 1px solid black;
  align-items: center;
`;

const FeedImg = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeedContent = styled.div`
  height: 30%;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d2d2d2;
  border-radius: 10px;
`;

const FeedEtc = styled.div`
  height: 20%;
`;

const FeedLikes = styled.div`
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeedComments = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

const FeedNavi = styled.div`
  margin: 1rem;
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const AddFeedWrap = styled.div`
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 50px;
  padding: 10px;
  width: 1500px;
  border: 1px solid #f7f4f4;
  border-radius: 10px;
  background-color: #f3faf8;
`;
const AddFeeds = styled.div`
  border-radius: 20px;
  text-align: center;
  padding: 10px;
  height: 200px;
  /* border: 1px solid black; */
  &:hover {
    transform: translateY(20px);
    cursor: pointer;
    background-color: white;
    box-shadow: 5px 5px 5px #c0b8b8;
  }
`;

const FeedArea = styled.textarea`
  width: 670px;
  height: 110px;
  resize: none;
`;

const WritedAt = styled.div`
  color: gray;
`;

const MyPageBtn = styled.button`
  background-color: lightblue;
  color: white;

  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1e6dff;
    transition: all 0.3s;
  }
`;

const EditDone = styled.button`
  background-color: #fcd99a;
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 5px;
  width: 105px;
  cursor: pointer;

  &:hover {
    background-color: #ffb81e;
    transition: all 0.3s;
  }
`;

const DeleteImg = styled.button`
  background-color: #a9fc9a;
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #8fff1e;
    transition: all 0.3s;
  }
`;

const FeedDeleteBtn = styled.button`
  background-color: #fab3d7;
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f772b0;
    transition: all 0.3s;
  }
`;
const FeedButton = styled.div`
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HomeBtn = styled.button`
  background-color: black;
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f74562;
    transition: all 0.3s;
  }
`;

const FeedItemImg = styled.img`
  border-radius: 20px;
  width: 600px;
  height: 250px;
`;

const OtherItemImg = styled.img`
  border-radius: 10px;
  width: 200px;
  height: 100px;
`;

const FileInput = styled.input`
  display: none;
`;
