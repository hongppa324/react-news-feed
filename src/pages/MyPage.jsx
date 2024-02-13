import { useEffect } from "react";
import styled from "styled-components";
import MyProfile from "../components/mypage/myprofile/MyProfile";
import MyPosts from "../components/mypage/myprofile/MyPosts";
import { useLoginContext } from "../context/login.context";

export default function MyPage() {
  // 로그인이 되어있는지 확인
  const { loginChecked } = useLoginContext();
  useEffect(() => {
    loginChecked();
  }, []);

  return (
    <Container>
      <MyProfile />
      <MyPosts />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
