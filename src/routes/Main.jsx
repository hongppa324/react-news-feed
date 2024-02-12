import React from "react";

import { Container, Content, SignUpLink, Description, Background } from "../styles/MyStyles";

import Spartan from "../assets/img/background.png";

function Main() {
  return (
    <Container>
      <Content>
        <SignUpLink to="/login">지금 가입</SignUpLink>
        <Description>여러분, 지금 친구들과 만나보세요. 뭔지 아시죠?</Description>
      </Content>
      <Background src={Spartan} alt="Spartans in New York" />
    </Container>
  );
}

export default Main;
