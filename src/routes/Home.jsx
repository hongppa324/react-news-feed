import React from "react";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Like from "../components/like/Like";
import { FcSms } from "react-icons/fc";
import styled from "styled-components";

function Home() {
  const navigate = useNavigate();
  const [feed, setFeed] = useState([]);

  //현재 사용자 정보불러오기
  const userInfo = useSelector((state) => state.UserInfo.userInfo);
  //현재 사용자 정보불러오기
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
            img: doc.data().img,
            likes: doc.data().likes
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

  const moveToMyProfile = () => {
    navigate("/my-page");
  };
  return (
    <>
      <HomeNav>
        <p>안녕하세요 {userInfo.name} 님 !</p>
        <button onClick={moveToMyProfile}>내프로필</button>
        <button onClick={writeToFeed}>글작성하기</button>
      </HomeNav>
      <HomeWrap className="home-wrap">
        <FeedListWrapper>
          {feed.map((e) => {
            return (
              <FeedList key={e.postId}>
                <ContentWrap className="content-wrap">
                  <ContentImg className="img">
                    <ContentImage src={e.img} alt="사진이없어용" />
                  </ContentImg>
                  <ContentText className="content">
                    <LinkStyle to={`/home/${e.postId}`}>
                      <div className="title">제목 : {e.title}</div>
                      <div className="text">글내용 : {e.content}</div>
                      <div className="time-wrap">
                        <div className="time">{e.date}</div>
                      </div>
                    </LinkStyle>
                    <div className="writer">
                      이름 : {e.writer}
                      <br /> <Like likes={e.likes} feedId={e.postId} />
                      <br />
                      <Link to={`/comment/${e.postId}`}>
                        <FcSms />
                      </Link>{" "}
                      {!e.isEdited ? "" : "(수정됨)"}
                      댓글
                    </div>
                  </ContentText>
                </ContentWrap>
              </FeedList>
            );
          })}
        </FeedListWrapper>
      </HomeWrap>
    </>
  );
}
export default Home;

const HomeNav = styled.nav`
  /* border: "1px solid black" display: "flex", height: "40px" */
  background-color: aliceblue;
`;

const HomeWrap = styled.div`
  margin: 1rem;
`;

const FeedListWrapper = styled.ul`
  display: grid;
  gap: 50px;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  margin: 10px auto 10px auto;
  scrollbar-width: none;
`;

const ContentWrap = styled.div`
  margin: 0 auto;
  width: 400px;
  padding: 3rem;
  box-shadow: 3px 10px 5px gray;
`;

const ContentImg = styled.div`
  border: 1px solid lightgray;
  height: 260px;
`;

const ContentImage = styled.img`
  width: 320px;
  height: 250px;
`;

const FeedList = styled.li``;

const ContentText = styled.div`
  height: 150px;
  text-align: center;
  font-size: 19px;
  line-height: 1.7;
`;

const LikeStyle = styled(Link)`
  cursor: pointer;
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;
