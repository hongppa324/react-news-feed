import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <StyledHeader>
      <p>Footer</p>
    </StyledHeader>
  );
}

export default Footer;

const StyledHeader = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 5vh;
  background-color: rgba(20, 20, 20, 0.25);
`;
