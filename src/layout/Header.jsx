import React from "react";
import styled from "styled-components";

function Header() {
  return <StyledHeader>
    <p>Header</p>
  </StyledHeader>;
}

export default Header;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 5vh;
  background-color: rgba(20, 20, 20, 0.25);
`;
