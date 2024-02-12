import React from "react";
import { StyledHeader } from "../styles/MyStyles";
import SignOut from "../components/SignOut";

function Header() {
  return (
    <StyledHeader>
      <SignOut />
    </StyledHeader>
  );
}

export default Header;
