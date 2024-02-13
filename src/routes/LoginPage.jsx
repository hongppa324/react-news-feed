import React from "react";

import { Background, Container, Content, Centre } from "../styles/MyStyles";

import EmailLogin from "../components/EmailLogin";
import GoogleLogin from "../components/GoogleLogin";
import Spartan from "../assets/img/background.png";

function LoginPage() {
  return (
    <Container>
      <Content>
        <Centre>
          <EmailLogin />
          <GoogleLogin />
        </Centre>
      </Content>
      <Background src={Spartan} alt="Spartans in New York" />
    </Container>
  );
}

export default LoginPage;
