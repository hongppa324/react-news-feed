import React from "react";
import { Background, Container, Content, Centre } from "../styles/MyStyles";
import Spartan from "../assets/img/background.png";
import ResetFunc from "../components/ResetFunc";

function ResetPassword() {
  return (
    <Container>
      <Content>
        <Centre>
          <ResetFunc />
        </Centre>
      </Content>
      <Background src={Spartan} alt="Spartans in New York" />
    </Container>
  );
}

export default ResetPassword;
