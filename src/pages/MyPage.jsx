import styled from "styled-components";
import MyProfile from "../components/mypage/myprofile/MyProfile";
import MyPosts from "../components/mypage/myprofile/MyPosts";

export default function MyPage() {
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
