import React from "react";
import { Container, Content, Background } from "../styles/MyStyles";
import Spartan from "../assets/img/background.png";
import MainRedir from "../components/MainRedir";

function Main() {
  return (
    <Container>
      <Content>
        <MainRedir />
      </Content>
      <Background src={Spartan} alt="Spartans in New York" />
    </Container>
  );
}

export default Main;
