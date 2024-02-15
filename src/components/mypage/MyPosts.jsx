import React, { useState, useEffect } from "react";
import { authService, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import styled from "styled-components";

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const currentUser = authService.currentUser;

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (currentUser) {
        try {
          const q = query(collection(db, "newsFeed"), where("writer", "==", currentUser.displayName));
          const querySnapshot = await getDocs(q);

          const posts = [];
          querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() });
          });
          setMyPosts(posts);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };
    fetchMyPosts();
  }, [currentUser]);

  return (
    <MyPostContainer>
      <label>내가 작성한 글</label>
      <MyPostList>
        <ul>
          {myPosts.map((post) => (
            <li key={post.id}>
              <ListWrapper>
                <Title>
                  <label>제목 : </label>
                  {post.title}
                </Title>
                <Content>
                  <label>내용 : </label>
                  {post.content}
                </Content>
              </ListWrapper>
            </li>
          ))}
        </ul>
      </MyPostList>
    </MyPostContainer>
  );
};

const MyPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  & label {
    font-size: 30px;
  }
`;

const MyPostList = styled.div`
  margin-top: 10px;
  & ul {
    display: flex;
    flex-direction: row;
  }
  & li {
    width: 300px;
    height: 60px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
  }
`;
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  & label {
    font-size: 18px;
  }
`;
const Content = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  & label {
    font-size: 18px;
  }
`;

export default MyPosts;
