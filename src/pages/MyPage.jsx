import styled from "styled-components";
import MyProfile from "../components/mypage/myprofile/MyProfile";
import MyPosts from "../components/mypage/myprofile/MyPosts";

export default function MyPage({ userId }) {
  return (
    <Container>
      <MyProfile userId={userId} />
      <MyPosts userId={userId} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
