import React from "react";

import { Background, Container, Content, Centre } from "../styles/MyStyles";
import Spartan from "../assets/img/background.png";
import SignUp from "../components/SignUp";

function SignUpPage() {
  return (
    <Container>
      <Content>
        <Centre>
          <SignUp />
        </Centre>
      </Content>
      <Background src={Spartan} alt="Spartans in New York" />
    </Container>
  );
}

export default SignUpPage;
