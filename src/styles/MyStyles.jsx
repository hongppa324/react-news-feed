import styled from "styled-components";
import { Link } from "react-router-dom";

export const Background = styled.img`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`;
export const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 90vh;
`;
export const Content = styled.div`
  position: relative;
  top: 30vh;
  height: 35vh;
  width: 100%;
  background-color: rgba(20, 20, 20, 0.25);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const SignUpLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: black;
  background-color: white;
  margin-bottom: 12px;
  letter-spacing: 1.5px;
  font-size: 2vh;
  padding: 2vh 0;
  border: 1px solid transparent;
  border-radius: 4px;

  &:hover {
    background-color: lightgray;
  }
  width: 80vw;

  @media (min-width: 480px) {
    width: 55vw;
    min-width: 380px;
  }
  @media (min-width: 992px) {
    width: 40vw;
    min-width: 540px;
  }

`;
export const Description = styled.p`
  font-size: 1.8vh;
  line-height: 1.5;
  letter-spacing: 0.1vw;
  color: white;
`;
export const Centre = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.5rem;
  padding: 2vh;
  width: 40vw;
  height: 30vh;
  min-width: 400px;
`;
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const StyledSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
`;
export const StyledInput = styled.input`
  padding: 1vh;
  margin: 1vh;
  border: 0.2rem solid black;
  border-radius: 0.5rem;
  width: 30vw;
`;
const buttonStyle = `
  padding: 1vh;
  border: 0.2rem solid black;
  border-radius: 0.5rem;
  background-color: white;
  font-family: "nanum";
  font-size: 2vh;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;
export const StyledButton = styled.button`
  ${buttonStyle}
  margin: 1vh;
  width: 35vw;
`;
export const StyledSign = styled.div`
  display: flex;
  flex-direction: row;
`;
export const StyledSignIn = styled.button`
  ${buttonStyle}
  width: 17vw;
  margin: 1vh 0.5vw;
`;
export const StyledSignUp = styled(Link)`
  ${buttonStyle}
  width: 17vw;
  margin: 1vh 0.5vw;
  color: black;
  text-decoration: none;
`;
