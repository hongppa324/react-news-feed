import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { db } from "../../../firebase";

export default function MyPosts({ userId }) {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const q = query(collection(db, "newsFeed"), where("writerId", "==", userId));
        const querySnapshot = await getDocs(q);

        const userPostsData = [];

        querySnapshot.forEach((doc) => {
          userPostsData.push({ id: doc.id, ...doc.data() });
        });
        setUserPosts(userPostsData);
      } catch (error) {
        console.log("작성한 글을 불러오는 중 오류가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    getUserPosts();
  }, [userId]);

  if (loading) {
    return <div>Loading 중...</div>;
  }

  return (
    <MyPostContainer>
      <h2>내가 작성한 글</h2>
      <ul>
        {userPosts.map((post) => (
          <li key={post.id}>
            <NavLink to={`/post/${post.id}`}>{post.title}</NavLink>
          </li>
        ))}
      </ul>
    </MyPostContainer>
  );
}

const MyPostContainer = styled.div``;
