import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`    
  #root {
    font-family: "nanum";
    min-width: 800px; 
  }

  *{
    white-space: nowrap;
  }

  h3 {
    font-size: 4vh;
  }

  p {
    font-size: 2vh;
    margin-top: .1rem;
    line-height: 150%;
  }
`;

export default GlobalStyle;